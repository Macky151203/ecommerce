import React from 'react'
import Image from 'next/image'
import img1 from "../app/images/pcardimg1.png"
import { FaStar } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Productcard({id,price}:{id:number,price:number}) {
  const router =useRouter()
  return (
    <>
      <div className='flex flex-col shadow-md m-2 p-4  transparent rounded-lg hover:scale-105 transition bg-slate-50'>
        <Image className='rounded-lg' src={img1} alt='error loading image..' />
        <div className='flex flex-row justify-between mt-4 px-2'>
          <div className='font-semibold text-xl'>Shiny Dress</div>
          <div className='flex flex-row gap-1'>
            <FaStar className='text-yellow-400 text-xl' />
            <FaStar className='text-yellow-400 text-xl' />
            <FaStar className='text-yellow-400 text-xl' />
            <FaStar className='text-yellow-400 text-xl' />
            <FaStar className='text-yellow-400 text-xl' />
          </div>
        </div>
        <div className='px-2 mt-4 text-sm'>4K customer reviews</div>
        <div className='flex flex-row justify-between mt-4 px-2'>
          <div className='font-semibold text-xl'>{price}$</div>
          <div className='gap-1 text-red-400'>
              Almost sold out
          </div>
        </div>
        <div className='px-2'>
          <button onClick={()=>router.push(`${id}`)} className='px-2 mt-2 text-white hover:bg-red-400 p-1 rounded-md bg-red-500'>View</button>
        </div>
      </div>
    </>
  )
}

export default Productcard
