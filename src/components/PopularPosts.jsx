import React, { useEffect, useState } from 'react'
import { popularPosts } from '../utility/crudUtility'
import { useNavigate } from 'react-router-dom'
import './PopularPosts.css'

export const PopularPosts = () => {
    const [posts,setPosts]=useState(null)
    const navigate=useNavigate()
    useEffect(()=>{
        popularPosts(setPosts)
    },[])
 
  return (
    <div className='popularPosts d-flex flex-column gap-2 align-items-center'>
        <h4 className=''>👑</h4>

        {posts && posts.map(obj=>
             <div key={obj.id} className='btn btn-popular'
             onClick={()=>navigate('/detail/'+obj.id)}
             >{obj.title}</div>)}
    </div>
  )
}

