import React from 'react'
import { useState } from 'react'
import { Tiptap } from './Tiptap'

export const Story = ({story, setStory}) => {

  return (
    <div className=''>
       <Tiptap story={story} setStory={setStory} />
    </div>
  )
}

