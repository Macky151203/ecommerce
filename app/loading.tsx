import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function Loading() {
  return (
    <div className='bg-black w-screen h-screen flex justify-center items-center'>
        <AiOutlineLoading3Quarters className='animate-spin text-6xl text-red-500' />
    </div>
  )
}

export default Loading