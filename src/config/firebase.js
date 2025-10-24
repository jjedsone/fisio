// Firebase Configuration - Dra. Teiciane Ramalho
// Console: https://console.firebase.google.com/project/dra-teiciane-ramalho
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAzaHTr86443PHP9kEZ2Olhdzb-9KtnfPM",
  authDomain: "dra-teiciane-ramalho.firebaseapp.com",
  projectId: "dra-teiciane-ramalho",
  storageBucket: "dra-teiciane-ramalho.firebasestorage.app",
  messagingSenderId: "1025083141763",
  appId: "1:1025083141763:web:f9134db11f67f2b5a775b6",
  measurementId: "G-YQCYRF8ZPH"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Serviços Firebase
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;

