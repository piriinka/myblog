import React, { useEffect, useState } from 'react'
import { readPosts } from '../utility/crudUtility'
import { PostCard } from './PostCard'

export const Posts = ({selectedCategories}) => {
    const [posts,setPosts]=useState([])
//  console.log(selectedCategories)


    useEffect(()=>{
     readPosts(setPosts,selectedCategories)
     },[selectedCategories])

 //console.log(posts);
  return (
    <div className='blogpost'>
        <h2 className='main-title text-center '>Daily posts</h2>
        {posts.map(obj=>(<PostCard key={obj.id} {...obj}/>))}
    </div>
  )
}

