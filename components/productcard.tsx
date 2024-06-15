import React from 'react'
import Image from 'next/image'
import img1 from "../app/images/pink.jpg"
import img2 from "../app/images/black.jpg"
import img3 from "../app/images/blue.jpg"
import img4 from "../app/images/yellow.jpg"
import img5 from "../app/images/hoddie.jpg"
import img6 from "../app/images/green2.jpg"
import { FaStar } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


function Productcard({id,price,img,name}:{id:number,price:number,img:string,name:string}) {
  const images=[img1,img2,img3,img4,img5,img6]
  const router =useRouter()
  return (
    <>
      <div className='flex flex-col shadow-md m-2 p-4  transparent rounded-lg hover:scale-105 transition bg-slate-50'>
        <Image className='rounded-lg' src={images[id-1]} alt='error loading image..' height={230}/>
        <div className='flex flex-row justify-between mt-4 px-2'>
          <div className='font-semibold text-xl'>{name}</div>
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
