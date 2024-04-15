"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'



const Categories = () => {

    const [categories,setCategories] = useState([])
    const [userId,setUserId] = useState();
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

    const logoutHandler = async () => {
        const res = await axios.get("/api/user/logout")
        if(res?.status === 200) {
            router.push('/login')
        }
        console.log(res)
    }

    useEffect(()=>{
        fetchData();
        getUser();
    },[])

    return (
        <div>
            {
                categories.map((cat) => <div key={cat?.id}>
                    <span>{cat?.name}</span>
                    <input type='checkbox' checked = {cat?.isChecked || cat.userId.includes(userId)} onChange={() =>changeHandler(cat)}/>
                </div>)
            }
            <button onClick={() => logoutHandler()}>Logout</button>
        </div>
    )
}

export default Categories