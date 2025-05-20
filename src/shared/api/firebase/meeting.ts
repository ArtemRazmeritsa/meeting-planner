import { db } from '@/shared/firebase';
import { Meeting } from '@/shared/types/meeting';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const createMeeting = async (meeting: Omit<Meeting, 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'meetings'), {
      ...meeting,
      createdAt: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};
