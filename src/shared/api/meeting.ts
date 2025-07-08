import { db } from '@/shared/firebase';
import { IMeeting } from '@/shared/types/meeting';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuthStore } from '../global-stores/auth/use-auth-store';

export const createMeeting = async (
  meeting: IMeeting,
): Promise<{ id: string }> => {
  const user = useAuthStore.getState().user;

  if (!user?.uid) {
    throw new Error('User is not authenticated');
  }
  try {
    const docRef = await addDoc(collection(db, 'meetings'), {
      ...meeting,
      createdAt: serverTimestamp(),
      ownerId: user.uid,
    });
    return { id: docRef.id };
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Failed to create meeting');
  }
};
