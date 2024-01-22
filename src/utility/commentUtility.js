import { auth, db, storage } from "./firebaseApp";
import { doc, serverTimestamp, onSnapshot, collection, addDoc, query, where } from 'firebase/firestore';

export const addComment = async (postId, commentData) => {
  const commentsRef = collection(db, 'comments');
  const newItem = { ...commentData, postId, timestamp: serverTimestamp() };
  await addDoc(commentsRef, newItem);
}

export const readComments = async (postId, setComments) => {
  const commentsRef = collection(db, 'comments');
  const q = query(commentsRef, where('postId', '==', postId));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map(doc => doc.data());
    setComments(comments);
  });

  return unsubscribe;
}