import React, { useState, useEffect } from 'react';
import { addComment, readComments } from '../utility/commentUtility';
import { serverTimestamp } from 'firebase/firestore';
import './CommentForm.css';

export const CommentForm = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const unsubscribe = readComments(postId, setComments);
    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      const commentData = {
        text: newComment,
        timestamp: serverTimestamp(),
        // Include user information or other relevant data as needed
      };

      await addComment(postId, commentData);
      setNewComment('');
    }
  };

  return (
    <div className='comment-container'>
      <form id="contactForm">
        <fieldset>
          <h4 className='comment-title'>Say something about this!</h4>
          <span>Name:</span><input id="name" required type="text" />
          <span>Email:</span><input id="email" required type="email" />
          <br />
          <textarea name="comment" id="comment" cols="60" rows="10"
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} placeholder='Enter your comment...'></textarea>
          <br />
          <button className='submit' id='btn' type='button' onClick={handleAddComment}>Submit</button>
        </fieldset>
      </form>
      {/* Display comments */}
      <div className='commentsContainer'>
          <fieldset>
         <h6 className=''>Comments</h6>
         <section><div className='comments-container'>
         <div className="commentsContainer">
        {comments.map((comment) => (
          <div key={comment.id}>
            <p className='username'>{comment.username}</p>
            <p className='pcomment'>{comment.text}</p>
          </div>
        ))}
      </div>
            </div></section>
          </fieldset>
    </div>
    </div>
  );
};

