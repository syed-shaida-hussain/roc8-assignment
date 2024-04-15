"use client"

import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react"

const VerifyEmail = ({searchParams}) => {
  const {token} = searchParams;
  const router = useRouter();
  const [otp , setOtp] = useState(new Array(8).fill(""))
  const [error , setError] = useState("")

  const verifyOtpHandler = async () => {
    const combinedOtp = otp.join("")
    try {
      const res = await axios.post(`/api/user/verify?token=${token}`,combinedOtp)
      console.log(res)
      if(res?.data?.isUserVerified) {
        router.push("/login")
        setOtp(new Array(8).fill(""))
      }
    } catch (error) {
      setError(error.response.data.error)
    }
  }

  const handleOtpChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    setOtp([...otp.map((data,i) => (i === index ? e.target.value : data) )])
    if (value && e.target.nextSibling && e.target.nextSibling.tagName === "INPUT") {
      e.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (index,e) => {
    if(e.key === "Backspace")  {
      if (e.target.previousElementSibling) {
        e.target.previousElementSibling.focus();
      }
    }
  }

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleOtpChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otp-input"
            maxLength={1}
          />
        );
      })}
      <button onClick={() => verifyOtpHandler()}>Verify</button>
      <div>{error && error}</div>
    </div>
  );
}

export default VerifyEmail