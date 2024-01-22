import React, { useState, useEffect } from 'react';
import { addComment, readComments } from '../utility/commentUtility';
import { serverTimestamp } from 'firebase/firestore';
import './CommentForm.css';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const CommentForm = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const param = useParams();

  useEffect(() => {
    if (param?.id)
      readComments(postId, setComments);
  }, [postId]);

  useEffect(() => {
    if (comments.length > 0 && param?.id) {
      setValue('name', comments[0].name);
      setValue('comment', comments[0].comment);
    }
  }, [comments, param?.id]);

  const onSubmit = async (data,e) => {
    try {
      if (newComment.trim() !== '') {
        const commentData = {
          name: data.name,
          email: data.email,
          comment: newComment,
        };
        await addComment(postId, commentData);

        setNewComment('');
        reset();
      }
    } catch (err) {
      console.log('Error during commenting!', err);
    }

  };

  return (
    <div className='comment-container'>
      <form id="contactForm">
        <fieldset>
          <h4 className='comment-title'>Say something about this!</h4>
          <span>Name:</span><input {...register('name', { required: true })} type="text" />
          <span>Email:</span><input {...register('email', { required: true })} type="email" />
          <br />
          <textarea name="comment" cols="60" rows="10"
            type="text"
            {...register('comment', { required: true })}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} placeholder='Enter your comment...'></textarea>
          <br />
          <button className='submit' id='btn' type='button' onClick={handleSubmit(onSubmit)}>Submit</button>
        </fieldset>
      </form>
      {/* Display comments */}
      <div className='commentsContainer'>
        <fieldset>
          <h6 className=''>Comments</h6>
          <section>
            <div className='comments-container'>
              <div className="commentsContainer">
                {comments.map((comment, index) => (
                  <div key={index}>
                    <p className='username'>{comment.name}</p>
                    <p className='pcomment'>{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </fieldset>
      </div>
    </div>
  );
};