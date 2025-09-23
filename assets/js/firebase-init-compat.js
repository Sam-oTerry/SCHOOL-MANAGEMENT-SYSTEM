// Firebase compat initialization for HTML pages using script tags
// Requires firebase-app-compat, firebase-auth-compat, firebase-firestore-compat to be loaded before this file.
(function () {
  if (!window.firebase || !firebase.initializeApp) {
    console.error('Firebase compat SDK not loaded before firebase-init-compat.js');
    return;
  }

  // Keep config in one place; matches assets/js/firebase-config.js values
  const firebaseConfig = {
    apiKey: "AIzaSyC13_vM3RlSSxCDXTiKafekCBPpejtSGWc",
    authDomain: "ass-sms.firebaseapp.com",
    projectId: "ass-sms",
    storageBucket: "ass-sms.firebasestorage.app",
    messagingSenderId: "515388722489",
    appId: "1:515388722489:web:21169f130303f48aaa2ce8"
  };

  // Initialize only once
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // Expose shared instances
  window.auth = firebase.auth();
  window.db = firebase.firestore();
})();


