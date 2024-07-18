"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from "axios"

const Navbar = () => {
    const [user , setUser] = useState()
    const getUser = async () => {
        try {
            const res = await axios.get("/api/user/me")
            setUser(res?.data?.user)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getUser()
    },[])
  return (
    <header className='header'>
        <ul className='top-header flex gap-20'>
            <li>Help</li>
            <li>Orders & Returns</li>
            <li>Hi, {user?.name}</li>
        </ul>
        <nav className='navbar flex'>
            <h1 className='title'>Ecommerce</h1>
            <div className='main-nav flex gap-20'>
                <Link href= "">Categories</Link>
                <Link href= "">Sale</Link>
                <Link href= "">Clearance</Link>
                <Link href= ""> New stock</Link>
                <Link href= "">Trending</Link>
            </div>
            <div className='flex gap-30'>
                <Image src= "/search.png" alt='search' width={20} height={20}/>
                <Image src= "/cart.png" alt='cart' width={20} height={20}/>
            </div>
        </nav>
        <div className="text-center discounts"><span>{"<"}</span>Get 10% off on business sign up<span>{">"}</span></div>

    </header>
  )
}

export default Navbar