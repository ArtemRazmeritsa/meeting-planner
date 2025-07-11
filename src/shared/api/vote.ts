import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/shared/firebase';
import { IVote } from '@/shared/types/vote';

export const submitVote = async (vote: Omit<IVote, 'votedAt'>) => {
  try {
    return await addDoc(collection(db, 'votes'), {
      ...vote,
      votedAt: serverTimestamp(),
    });
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};
