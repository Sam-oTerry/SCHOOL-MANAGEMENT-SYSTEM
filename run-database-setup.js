// Run Database Setup Script
import { firestorePusher } from './assets/js/firestore-pusher.js';

async function runDatabaseSetup() {
  console.log('🚀 Starting School Management System Database Setup...');
  console.log('================================================');
  
  try {
    const result = await firestorePusher.pushCompleteDatabase();
    
    if (result.success) {
      console.log('✅ Database setup completed successfully!');
      console.log('================================================');
      console.log('📊 Summary:');
      
      result.results.forEach(result => {
        if (result.success) {
          console.log(`✅ ${result.collection}: ${result.count} documents created`);
        } else {
          console.log(`❌ ${result.collection}: Failed - ${result.error}`);
        }
      });
      
      console.log('================================================');
      console.log('🎉 Your School Management System database is ready!');
      console.log('You can now start using the application.');
      
    } else {
      console.error('❌ Database setup failed:', result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

// Run the setup
runDatabaseSetup();
