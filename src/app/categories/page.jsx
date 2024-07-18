"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import "./categories.css"



const Categories = () => {

    const [categories,setCategories] = useState([])
    const [userId,setUserId] = useState();
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage , setPostsPerPage] = useState(6)
    
    const router = useRouter();
    
    const fetchData = async () => {
        try {
          const res = await axios.get("/api/categories")
          setCategories(res?.data?.categories)
        } catch (error) {
          console.log(error)
        }
    }

    const getUser = async () => {
        try {
            const res = await axios.get("/api/user/me")
            setUserId(res?.data?.userId)
        } catch (error) {
            console.log(error.message)
        }
    }

    const changeHandler = async (cat) => {
            try {
                const res = await axios.put(`/api/categories/${cat?.id}` , cat)
                console.log(res)
                 const newArray = categories.map(item => item.id === cat.id ? {...item , isChecked : !cat.isChecked} : {...item})
                 setCategories(newArray)
            } catch (error) {
                console.log(error.response)
            }
    }

    // const logoutHandler = async () => {
    //     const res = await axios.get("/api/user/logout")
    //     if(res?.status === 200) {
    //         router.push('/login')
    //     }
    //     console.log(res)
    // }

    useEffect(()=>{
        fetchData();
        getUser();
    },[])

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentCategories = categories.slice(firstPostIndex , lastPostIndex)

    return (
        <div className='container'>
            <h1 className='title'>Please mark your interests!</h1>
            <div className='notification-text'>We will keep you notified.</div>
            <div className='categories'>
                <p className='text'>My saved interests!</p>
                {
                currentCategories.map((cat) => <div key={cat?.id} className='category'>
                    <div className='checkbox-container' onClick={() =>changeHandler(cat)}>
                        <input type='checkbox' className= {cat?.isChecked || cat.userId.includes(userId) ? "checkbox-checked" : "checkbox"} checked = {cat?.isChecked || cat.userId.includes(userId)} />
                    </div>
                   
                    <span className='cat-name'>{cat?.name}</span>
                </div>)
            }
            </div>

            {/* <button onClick={() => logoutHandler()}>Logout</button> */}
        </div>
    )
}

export default Categories