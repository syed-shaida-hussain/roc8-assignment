"use client";

import "./login.css"
import Link from 'next/link'
import { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [user , setUser] = useState({email : "", password : ""});
  const [error , setError] = useState({ emailError : '' ,passwordError : "" });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user/login' , user);
      if(res?.status === 200){
        router.push('/categories');
      }
    } catch (error) {
      const {response} = error
      setError({...error ,emailError : response?.data?.errors?.email, passwordError : response?.data?.errors?.password  })
    }
  }

  return (
    <form onSubmit={handleLogin} className= 'container'>
        <div className= 'wrapper'>
          <h1 className= 'title'>Login</h1>
          <div className="flex-col">
            <h2 className="sub-title">Welcome back to ECOMMERCE</h2>
            <div className="tagline">The next gen business marketplace</div>
          </div>
          
          <label className= 'label'> Email
            <input value={user?.email} type='email' placeholder='Enter' className= 'input' onChange={(e) => setUser({...user , email : e.target.value})} />
            <div>{error?.emailError}</div>
          </label>
          <label className= 'label'> Password
            <input value={user?.password} type='password' placeholder='Enter' className= 'input' onChange={(e) => setUser({...user , password : e.target.value})}  />
            <div>{error?.passwordError}</div>
          </label>
          <button type='submit' className= 'cta-btn'>Login</button>
          <hr className="hr"/>
          <Link href= "/signup" className= 'link'>Don’t have an Account?  <span className="bold">SIGN UP</span></Link>
        </div>
    </form>
  )
}

export default LoginPage