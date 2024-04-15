"use client";

import "./signup.css"
import Link from 'next/link'
import { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [user , setUser] = useState({name: "" , password : "" , email : ""});
  const [error , setError] = useState({nameError : "" , passwordError : "" , emailError : '' });
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/signup' , user);
      if(res?.status === 201){
        router.push(`/verify-email?token=${res?.data?.user?.verifyToken}`);
      }
    } catch (error) {
      console.log(error)
      const {response} = error
      setError({...error , nameError : response?.data?.errors?.name , passwordError : response?.data?.errors?.password , emailError : response?.data?.errors?.email })
    }
  }

  return (
    <form onSubmit={handleSignup} className= 'container'>
        <div className= 'wrapper'>
          <h1 className= 'title'>Create your account</h1>
          <label className= 'label'> Name
            <input value={user?.name} type='text' placeholder='Enter' className= 'input' onChange={(e) => setUser({...user , name : e.target.value})} />
            <div>{error?.nameError}</div>
          </label>
          <label className= 'label'> Email
            <input value={user?.email} type='email' placeholder='Enter' className= 'input' onChange={(e) => setUser({...user , email : e.target.value})} />
            <div>{error?.emailError}</div>
          </label>
          <label className= 'label'> Password
            <input value={user?.password} type='password' placeholder='Enter' className= 'input' onChange={(e) => setUser({...user , password : e.target.value})}  />
            <div>{error?.passwordError}</div>
          </label>
          <button type='submit' className= 'cta-btn'>CREATE ACCOUNT</button>
          <Link href= "/login" className= 'link'>Have an account? <span className="bold">LOGIN</span></Link>
        </div>
    </form>
  )
}

export default SignupPage