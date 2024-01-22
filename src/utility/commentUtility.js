import { auth, db, storage } from "./firebaseApp";
import { doc, getDoc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';

// Function to add a comment to a post
export const addComment = async (postId, commentData) => {
  const postRef = doc(db, 'posts', postId);

  try {
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const comments = postSnap.data().comments || [];
      const updatedComments = [...comments, { ...commentData, timestamp: serverTimestamp() }];

      await updateDoc(postRef, { comments: updatedComments });
    } else {
      console.log('Post does not exist.');
    }
  } catch (err) {
    console.error(err);
  }
}

// Function to read comments for a post
export const readComments = async (postId, setComments) => {
  const postRef = doc(db, 'posts', postId);

  const unsubscribe = onSnapshot(postRef, (snapshot) => {
    const comments = snapshot.data()?.comments || [];
    setComments(comments);
  });

  return unsubscribe;
}
