import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteFile, deletePost, readPost, editLikes } from '../utility/crudUtility'
import parse from 'html-react-parser'
import './Detail.css'
import { FaPencilAlt, FaThumbsUp } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import {UserContext} from '../context/UserContext'
import { useConfirm } from "material-ui-confirm";
import { MyAlert } from '../components/MyAlert'


export const Detail = () => {
  const {user}=useContext(UserContext)
  const navigate=useNavigate()
  const [post,setPost]=useState(null)
  const [msg,setMsg]=useState('')
  const [likes,setLikes]=useState(null)
  const params=useParams()
 // console.log(params.id);
 const confirm=useConfirm()

  useEffect(()=>{
    readPost(params.id,setPost,setLikes)
  },[])

  const handleDelete=async ()=>{
    try{
      await confirm({
        description:'This cannot be undone.',
        confirmationText:'Yes, delete',
        cancellationText:'Retry',
        title:'Are you sure you want to delete?'
      })
      //console.log('yep.')
      const result=await deleteFile(post.photoUrl)
      if(result){
        deletePost(post.id)
        navigate('/')
      }else
      console.log('failure while deleting file')
    }catch(err){
     // console.log('nop.')
    }
  }

  const handleLikes=async ()=>{
    if(user){
      //console.log(user.uid,params.id)
      const likeCount=await editLikes(params.id,user.uid)
      //console.log(`like count:${likeCount}`);
      setLikes(likeCount)
    }else{
      console.log('you are not logged in')
      setMsg('Please login to continue.')
    }
  }

 // console.log(post)

  return (
    <div className='container p-3 details'>
      <div className='imgContainer '>
      {post && <img src={post?.photoUrl} alt={post?.title} 
      className='image '
      onClick={()=>window.open(post?.photoUrl, '_blank')}/>}</div>
      <h3 className='h3 text-center'>{post?.title}</h3>
      <div className="d-flex justify-content-between p-2">
        <div className="likes">
          <FaThumbsUp className='thumb p-2' onClick={handleLikes}/>
          <span className=''>{likes==0 ? '' : likes}</span>
        </div>
        {(user && post && user.uid==post.userId) &&
        <div>
          <FaPencilAlt className='pencil p-2' onClick={()=>navigate('/update/'+post.id)}/>
          <FaTrash className='trash p-2'onClick={handleDelete}/>
        </div>}
      </div>
      { msg && <MyAlert text={msg} />}

      <div className='post'>{post && <span>{parse(post?.description)}</span>}
     
      </div>

      <span className='postAuthor'>{post?.author}</span>

      <div className="d-flex justify-content-center">
        <button className='btn' onClick={()=>navigate('/')}>Return</button>
      </div>

      </div>
  )
}

