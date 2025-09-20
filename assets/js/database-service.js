// Firestore Database Service
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase-config.js';

class DatabaseService {
  constructor() {
    this.db = db;
  }

  // Generic CRUD operations
  async create(collectionName, data, docId = null) {
    try {
      if (docId) {
        await setDoc(doc(this.db, collectionName, docId), {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        return { success: true, id: docId };
      } else {
        const docRef = await addDoc(collection(this.db, collectionName), {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        return { success: true, id: docRef.id };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async read(collectionName, docId) {
    try {
      const docRef = doc(this.db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
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
      const docRef = doc(this.db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(collectionName, docId) {
    try {
      await deleteDoc(doc(this.db, collectionName, docId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Query operations
  async query(collectionName, constraints = []) {
    try {
      const q = query(collection(this.db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
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
    const q = query(collection(this.db, collectionName), ...constraints);
    return onSnapshot(q, (querySnapshot) => {
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
      const batch = writeBatch(this.db);
      
      operations.forEach(operation => {
        const { type, collection, docId, data } = operation;
        const docRef = doc(this.db, collection, docId);
        
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
      where('academicInfo.currentClass', '==', className),
      where('academicInfo.status', '==', 'active')
    ]);
  }

  async getStudentGrades(studentId, academicYear, term) {
    return await this.query('grades', [
      where('studentId', '==', studentId),
      where('academicYear', '==', academicYear),
      where('term', '==', term)
    ]);
  }

  async getStudentTransactions(studentId) {
    return await this.query('financial_transactions', [
      where('studentId', '==', studentId),
      orderBy('paidDate', 'desc')
    ]);
  }

  async getOutstandingPayments() {
    return await this.query('students', [
      where('financialInfo.paymentStatus', '==', 'outstanding'),
      where('academicInfo.status', '==', 'active')
    ]);
  }

  // Teacher-specific operations
  async getTeacherStudents(teacherId) {
    return await this.query('students', [
      where('classTeacher', '==', teacherId),
      where('academicInfo.status', '==', 'active')
    ]);
  }

  async getTeacherSubjects(teacherId) {
    return await this.query('subjects', [
      where('teachers', 'array-contains', teacherId)
    ]);
  }

  // Bursar-specific operations
  async getFinancialTransactions(startDate, endDate) {
    return await this.query('financial_transactions', [
      where('paidDate', '>=', startDate),
      where('paidDate', '<=', endDate),
      orderBy('paidDate', 'desc')
    ]);
  }

  async getPaymentAnalytics() {
    const transactions = await this.query('financial_transactions', [
      where('type', '==', 'income'),
      where('status', '==', 'completed')
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
