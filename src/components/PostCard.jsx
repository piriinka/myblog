import React from 'react'
import { elapsedTime } from '../utility/elapsedTime'
import { truncatedStory } from '../utility/sanitiseHTML'
import { useNavigate } from 'react-router-dom'
import { FaThumbsUp } from 'react-icons/fa'

const maxLength=100


export const PostCard = ({ category, photoUrl,title,author,description,timestamp,id,likes }) => {
    const navigate=useNavigate()
    return (
        <div>
            <div className="card mb-3" style={{maxWidth:'100%'}}>
                <div className="row g-0">
                    <div className="d-flex col-md-3 col-lg-4 poster ">
                        <img src={photoUrl} className=" rounded-start bannerkep" alt={title} />
                    </div>
                    <div className="col-md-5 col-lg-8 d-flex">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                            <h5 className="postcard-title">{title}</h5>
                            <p className='card-text text-category'>{category}</p>
                            </div>
                            <p className=" card-text">
                            {truncatedStory(description,maxLength)} 
                            <span className='detailsPoint'
                            onClick={()=>navigate('detail/'+id)}> ... →</span></p>
                           
                            <div className="d-flex justify-content-between pt-4">

                            <p className="card-text">
                            <small className="text-muted">{elapsedTime(timestamp)}</small></p>

                            <p className="card-text">
                            <small className="author-text">by {author}</small></p>
                            <p className='fathumbsup'><FaThumbsUp/>{likes?.length}</p>
                        </div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

