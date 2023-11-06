import React, { createContext, useEffect, useState } from 'react'

const postCategories = ['personal', 'fashion', 'travel', 'health', 'relationship','sport', 'culture', 'funstuff', 'news','venting','food','interesting'];

export const CategContext=createContext()

export const CategProvider = ({children}) => {
    const [categories,setCategories]=useState(false)
    useEffect(()=>{
        setCategories(postCategories)
    },[])

  return (
    <CategContext.Provider value={{categories}} >
        {children}
    </CategContext.Provider>
    )
}

