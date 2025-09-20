// Firestore Database Service
// Using Firebase CDN - no imports needed

class DatabaseService {
  constructor() {
    this.db = firebase.firestore();
  }

  // Generic CRUD operations
  async create(collectionName, data, docId = null) {
    try {
      if (docId) {
        await this.db.collection(collectionName).doc(docId).set({
          ...data,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return { success: true, id: docId };
      } else {
        const docRef = await this.db.collection(collectionName).add({
          ...data,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return { success: true, id: docRef.id };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async read(collectionName, docId) {
    try {
      const docSnap = await this.db.collection(collectionName).doc(docId).get();
      
      if (docSnap.exists) {
        return { success: true, data: docSnap.data() };
      } else {
        return { success: false, error: 'Document not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(collectionName, docId, data) {
    try {
      await this.db.collection(collectionName).doc(docId).update({
        ...data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(collectionName, docId) {
    try {
      await this.db.collection(collectionName).doc(docId).delete();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Query operations
  async query(collectionName, constraints = []) {
    try {
      let query = this.db.collection(collectionName);
      
      // Apply constraints
      constraints.forEach(constraint => {
        if (constraint.type === 'where') {
          query = query.where(constraint.field, constraint.operator, constraint.value);
        } else if (constraint.type === 'orderBy') {
          query = query.orderBy(constraint.field, constraint.direction || 'asc');
        } else if (constraint.type === 'limit') {
          query = query.limit(constraint.limit);
        }
      });
      
      const querySnapshot = await query.get();
      const results = [];
      
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: results };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Real-time listeners
  subscribeToCollection(collectionName, callback, constraints = []) {
    let query = this.db.collection(collectionName);
    
    // Apply constraints
    constraints.forEach(constraint => {
      if (constraint.type === 'where') {
        query = query.where(constraint.field, constraint.operator, constraint.value);
      } else if (constraint.type === 'orderBy') {
        query = query.orderBy(constraint.field, constraint.direction || 'asc');
      } else if (constraint.type === 'limit') {
        query = query.limit(constraint.limit);
      }
    });
    
    return query.onSnapshot((querySnapshot) => {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      callback(results);
    });
  }

  // Batch operations
  async batchWrite(operations) {
    try {
      const batch = this.db.batch();
      
      operations.forEach(operation => {
        const { type, collection, docId, data } = operation;
        const docRef = this.db.collection(collection).doc(docId);
        
        switch (type) {
          case 'set':
            batch.set(docRef, data);
            break;
          case 'update':
            batch.update(docRef, data);
            break;
          case 'delete':
            batch.delete(docRef);
            break;
        }
      });
      
      await batch.commit();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Student-specific operations
  async getStudentsByClass(className) {
    return await this.query('students', [
      { type: 'where', field: 'academicInfo.currentClass', operator: '==', value: className },
      { type: 'where', field: 'academicInfo.status', operator: '==', value: 'active' }
    ]);
  }

  async getStudentGrades(studentId, academicYear, term) {
    return await this.query('grades', [
      { type: 'where', field: 'studentId', operator: '==', value: studentId },
      { type: 'where', field: 'academicYear', operator: '==', value: academicYear },
      { type: 'where', field: 'term', operator: '==', value: term }
    ]);
  }

  async getStudentTransactions(studentId) {
    return await this.query('financial_transactions', [
      { type: 'where', field: 'studentId', operator: '==', value: studentId },
      { type: 'orderBy', field: 'paidDate', direction: 'desc' }
    ]);
  }

  async getOutstandingPayments() {
    return await this.query('students', [
      { type: 'where', field: 'financialInfo.paymentStatus', operator: '==', value: 'outstanding' },
      { type: 'where', field: 'academicInfo.status', operator: '==', value: 'active' }
    ]);
  }

  // Teacher-specific operations
  async getTeacherStudents(teacherId) {
    return await this.query('students', [
      { type: 'where', field: 'classTeacher', operator: '==', value: teacherId },
      { type: 'where', field: 'academicInfo.status', operator: '==', value: 'active' }
    ]);
  }

  async getTeacherSubjects(teacherId) {
    return await this.query('subjects', [
      { type: 'where', field: 'teachers', operator: 'array-contains', value: teacherId }
    ]);
  }

  // Bursar-specific operations
  async getFinancialTransactions(startDate, endDate) {
    return await this.query('financial_transactions', [
      { type: 'where', field: 'paidDate', operator: '>=', value: startDate },
      { type: 'where', field: 'paidDate', operator: '<=', value: endDate },
      { type: 'orderBy', field: 'paidDate', direction: 'desc' }
    ]);
  }

  async getPaymentAnalytics() {
    const transactions = await this.query('financial_transactions', [
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
      monthlyData: {}
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
    });

    return { success: true, data: analytics };
  }
}

export const dbService = new DatabaseService();
