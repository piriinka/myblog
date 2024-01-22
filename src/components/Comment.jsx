import React from 'react'
import { Comments } from './Comments'


export const Comment = () => {
  return (
    <div>
        <div className='comment-container'>
     <form id="contactForm">
          <fieldset>
            <h4 className='comment-title'>Comment!</h4>
            <span>Name:</span><input id="name" required type="text" />
            <span>Email:</span><input id="email" required type="email"/>
            <br />
            <textarea name="comment" id="comment" cols="60" rows="10" placeholder='Enter your comment...'></textarea>
            <br />
            <button className='submit' id='btn' type='submit' onSubmit={handleCommentSubmit}>Submit</button>
          </fieldset>
        </form>
        {/* Display comments */}
        <div className="comments">
          <h4 className="comment-title">Comments:</h4>
          <Comments key={obj.id} {...obj}/>
        </div>
      </div>
    </div>
  )
}
