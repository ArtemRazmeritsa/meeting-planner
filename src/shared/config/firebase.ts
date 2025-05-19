import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCEvUSJ_7T521Gb_rayKf1nkWcuRyNklc8',
  authDomain: 'meeting-planner-318c8.firebaseapp.com',
  projectId: 'meeting-planner-318c8',
  storageBucket: 'meeting-planner-318c8.firebasestorage.app',
  messagingSenderId: '793536737173',
  appId: '1:793536737173:web:5fc18b5b0ed917478f109c',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
