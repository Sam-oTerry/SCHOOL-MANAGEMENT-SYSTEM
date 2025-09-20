// School Pay Uganda Integration Service
// Using Firebase CDN - no imports needed

class SchoolPayService {
  constructor() {
    this.db = window.dbService;
  }

  // Sync payment codes from School Pay Uganda
  async syncPaymentCodes(schoolPayData) {
    try {
      const results = {
        totalCodes: schoolPayData.length,
        successfulMappings: 0,
        failedMappings: 0,
        errors: []
      };

      for (const codeData of schoolPayData) {
        try {
          // Find student by School Pay ID or name
          const student = await this.findStudentBySchoolPayId(codeData.schoolPayStudentId) ||
                         await this.findStudentByName(codeData.studentName);

          if (student) {
            // Update student with School Pay payment code
            await this.updateStudentPaymentCode(student.id, codeData);
            results.successfulMappings++;
          } else {
            results.failedMappings++;
            results.errors.push({
              paymentCode: codeData.paymentCode,
              studentName: codeData.studentName,
              error: 'Student not found in our system'
            });
          }
        } catch (error) {
          results.failedMappings++;
          results.errors.push({
            paymentCode: codeData.paymentCode,
            studentName: codeData.studentName,
            error: error.message
          });
        }
      }

      return results;
    } catch (error) {
      throw new Error(`Failed to sync payment codes: ${error.message}`);
    }
  }

  // Find student by School Pay ID
  async findStudentBySchoolPayId(schoolPayId) {
    const result = await this.db.query('students', [
      { type: 'where', field: 'schoolPayId', operator: '==', value: schoolPayId }
    ]);
    
    return result.success && result.data.length > 0 ? result.data[0] : null;
  }

  // Find student by name
  async findStudentByName(studentName) {
    const result = await this.db.query('students', [
      { type: 'where', field: 'personalInfo.fullName', operator: '==', value: studentName }
    ]);
    
    return result.success && result.data.length > 0 ? result.data[0] : null;
  }

  // Update student with School Pay payment code
  async updateStudentPaymentCode(studentId, schoolPayData) {
    const updateData = {
      paymentCode: schoolPayData.paymentCode,
      'schoolPayIntegration.paymentCode': schoolPayData.paymentCode,
      'schoolPayIntegration.paymentInstructions': {
        code: schoolPayData.paymentCode,
        instructions: `Use payment code ${schoolPayData.paymentCode} when making payments via School Pay Uganda`,
        qrCodeUrl: schoolPayData.qrCodeUrl || null
      },
      'schoolPayIntegration.lastSyncDate': new Date(),
      'schoolPayIntegration.syncStatus': 'successful'
    };

    return await this.db.update('students', studentId, updateData);
  }

  // Process School Pay transaction file
  async processTransactionFile(file) {
    try {
      // Parse Excel file (using SheetJS or similar library)
      const workbook = XLSX.readFile(file);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const integrationRecord = {
        fileName: file.name,
        importDate: new Date(),
        totalRecords: data.length,
        successfulImports: 0,
        failedImports: 0,
        status: 'processing',
        importedBy: window.authService.getCurrentUser().uid,
        errors: []
      };

      // Process each transaction
      for (const row of data) {
        try {
          await this.processTransaction(row, integrationRecord);
          integrationRecord.successfulImports++;
        } catch (error) {
          integrationRecord.failedImports++;
          integrationRecord.errors.push({
            row: data.indexOf(row) + 1,
            studentId: row.studentId,
            error: error.message,
            data: row
          });
        }
      }

      // Save integration record
      await this.db.create('school_pay_integrations', integrationRecord);

      return integrationRecord;
    } catch (error) {
      throw new Error(`Failed to process transaction file: ${error.message}`);
    }
  }

  // Process individual transaction
  async processTransaction(row, integrationRecord) {
    // Find student by payment code
    let student = null;
    
    if (row.paymentCode) {
      student = await this.findStudentByPaymentCode(row.paymentCode);
      
      if (!student) {
        throw new Error(`Payment code ${row.paymentCode} not found. Please sync payment codes first.`);
      }
    } else {
      // Fallback: find by School Pay student ID or name
      student = await this.findStudentBySchoolPayId(row.studentId) ||
                await this.findStudentByName(row.studentName);
      
      if (!student) {
        throw new Error(`Student not found: ${row.studentName} (ID: ${row.studentId})`);
      }
    }

    // Create transaction record
    const transaction = {
      schoolPayTransactionId: row.transactionId,
      studentId: student.id,
      type: 'income',
      category: this.mapFeeType(row.feeType),
      amount: parseFloat(row.amount),
      currency: 'UGX',
      paymentMethod: this.mapPaymentMethod(row.paymentMethod),
      description: row.description,
      reference: row.reference,
      schoolPayReference: row.schoolPayReference,
      status: this.mapPaymentStatus(row.status),
      processedBy: window.authService.getCurrentUser().uid,
      processedAt: new Date(),
      paidDate: new Date(row.paymentDate),
      schoolPayData: {
        originalTransactionId: row.transactionId,
        schoolPayStatus: row.status,
        schoolPayMethod: row.paymentMethod,
        schoolPayReference: row.schoolPayReference,
        parentPhone: row.parentPhone,
        parentName: row.parentName,
        paymentCode: row.paymentCode || student.paymentCode
      }
    };

    // Save transaction
    await this.db.create('financial_transactions', transaction);

    // Update student financial info
    await this.updateStudentFinancialInfo(student.id, transaction);
  }

  // Find student by payment code
  async findStudentByPaymentCode(paymentCode) {
    const result = await this.db.query('students', [
      { type: 'where', field: 'paymentCode', operator: '==', value: paymentCode }
    ]);
    
    return result.success && result.data.length > 0 ? result.data[0] : null;
  }

  // Update student financial information
  async updateStudentFinancialInfo(studentId, transaction) {
    const student = await this.db.read('students', studentId);
    
    if (student.success) {
      const studentData = student.data;
      const newTotalPaid = (studentData.financialInfo?.totalFeesPaid || 0) + transaction.amount;
      const newBalance = (studentData.financialInfo?.totalFeesOwed || 0) - newTotalPaid;
      
      await this.db.update('students', studentId, {
        'financialInfo.totalFeesPaid': newTotalPaid,
        'financialInfo.currentBalance': newBalance,
        'financialInfo.lastPaymentDate': transaction.paidDate,
        'financialInfo.paymentStatus': newBalance <= 0 ? 'paid' : 'partial',
        'schoolPayIntegration.lastSyncDate': new Date(),
        'schoolPayIntegration.syncStatus': 'successful'
      });
    }
  }

  // Mapping functions
  mapFeeType(schoolPayFeeType) {
    const mapping = {
      'Tuition': 'tuition_fee',
      'Examination': 'examination_fee',
      'Library': 'library_fee',
      'Sports': 'sports_fee',
      'Transport': 'transport_fee',
      'Meals': 'meals_fee',
      'Other': 'other_fee'
    };
    return mapping[schoolPayFeeType] || 'other_fee';
  }

  mapPaymentMethod(schoolPayMethod) {
    const mapping = {
      'Mobile Money': 'mobile_money',
      'Bank Transfer': 'bank_transfer',
      'Cash': 'cash',
      'School Pay': 'school_pay',
      'Card': 'card'
    };
    return mapping[schoolPayMethod] || 'cash';
  }

  mapPaymentStatus(schoolPayStatus) {
    const mapping = {
      'Completed': 'completed',
      'Pending': 'pending',
      'Failed': 'failed',
      'Cancelled': 'cancelled'
    };
    return mapping[schoolPayStatus] || 'pending';
  }

  // Get payment analytics
  async getPaymentAnalytics() {
    const transactions = await this.db.query('financial_transactions', [
      { type: 'where', field: 'type', operator: '==', value: 'income' },
      { type: 'where', field: 'status', operator: '==', value: 'completed' }
    ]);

    if (!transactions.success) {
      return { success: false, error: transactions.error };
    }

    const analytics = {
      totalAmount: 0,
      paymentMethods: {},
      feeTypes: {},
      monthlyData: {},
      schoolPayTransactions: 0
    };

    transactions.data.forEach(transaction => {
      analytics.totalAmount += transaction.amount;
      
      // Payment method distribution
      const method = transaction.paymentMethod;
      analytics.paymentMethods[method] = (analytics.paymentMethods[method] || 0) + 1;
      
      // Fee type distribution
      const feeType = transaction.category;
      analytics.feeTypes[feeType] = (analytics.feeTypes[feeType] || 0) + 1;
      
      // Monthly data
      const month = transaction.paidDate.toDate().toISOString().substring(0, 7);
      analytics.monthlyData[month] = (analytics.monthlyData[month] || 0) + transaction.amount;
      
      // School Pay transactions count
      if (transaction.schoolPayData) {
        analytics.schoolPayTransactions++;
      }
    });

    return { success: true, data: analytics };
  }
}

export const schoolPayService = new SchoolPayService();
