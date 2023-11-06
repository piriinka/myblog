import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendSignInLinkToEmail, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../utility/firebaseApp'
import { adminUserID } from "../firebaseConfig";




export const UserContext=createContext()

export const UserProvider=({children})=>{
    const [user,setUser] =useState(null)
    const [msg,setMsg] = useState(null)
    const [role,setRole]=useState('user')
    const navigate=useNavigate()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        currentUser?.uid === adminUserID ? setRole('admin') : setRole('user');
      });
    
      return () => unsubscribe();
    }, []);

    const logoutUser=async() => {
        await signOut(auth)
        if(location.pathname=='/create' || location.pathname=='/profile')
        navigate('/')

    }

  const loginUser=async (email,pw) => {
    try{
      await signInWithEmailAndPassword(auth,email,pw)
      setMsg({...msg,signin:null})
      navigate('/')
    }catch (err){
      console.log(err.message);
      setMsg({...msg,signin:err.message});
    }
  }

  const sendEmailLink=async (email)=>{
    try{
      await sendSignInLinkToEmail(auth,email,{
        url:"http://localhost:5173/signin",
        handleCodeInApp:true,
      })
      alert('Your sign-up link has been sent.:)')
      logoutUser()
    }catch(err){
      console.log(err.message)
      setMsg({...msg,signup:err.message});

    }
  }

  const signUpUser=async (email,pw,displayName) => {
    try{
      await createUserWithEmailAndPassword(auth,email,pw)
      await updateProfile(auth.currentUser,{displayName:displayName})
      sendEmailLink(email)
      setMsg({...msg,signup:null});
    }catch (err){
      console.log(err.message);
      setMsg({...msg,signup:err.message});

    }
  }

  const resetPassword=async (email) => {
    try{
      await sendPasswordResetEmail(auth,email)
      alert('Password reset email sent successfully.')
      navigate('/signin')
      setMsg({...msg,resetpw: null});

    }catch(err){
      console.log(err.message)
      setMsg({...msg,resetpw: err.message});
    }
  }

    return(
        <UserContext.Provider value={{user,logoutUser,loginUser, signUpUser, resetPassword, msg,role}}>
            {children}
        </UserContext.Provider>

    )
}