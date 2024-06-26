'use client'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import getStipePromise from "../lib/stripe";
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from "next/link";
import Image from "next/image";
import ldimg from "../images/loading.png"
import { CiShoppingCart } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

function Cart() {

  const supabase = createClientComponentClient();
  const router=useRouter()
  const [cartitem, setcartitem] = useState([])
  const [loading, setloading] = useState(true)



  useEffect(() => {



    const func = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
          router.push('/login')
      }
      if(user){
        const response = await fetch('/api/getcart', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user)
        })
        const data = await response.json()
        setcartitem(data.cartitem)
        setloading(false)
      }
    }
    func()
  }, [])

  const Delete=async(item:any)=>{
    const res=await fetch('/api/removefromcart',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    })
    const data=await res.json()
    console.log(data)
    window.location.reload()
  }

  const handlecheckout = async () => {

    const stripe = await getStipePromise()
    const res = await fetch('/api/stripecheckout/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-cache",
      body: JSON.stringify(cartitem)
    })
    const data = await res.json()
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id })
    }
  }


  return (
    <>
      <div className='bg-white overflow-x-hidden w-screen h-screen flex flex-col items-center gap-2 p-4'>
      <div className="grid w-[100vw] place-items-center my-4">
          <Link href="/" className="nav text-red-500 text-3xl font-semibold">
            HEXA
          </Link>
        </div>
        <div className=" cart absolute right-4 md:right-16 top-6 flex gap-4">
          {/* <CiShoppingCart className="cursor-pointer" size={24} /> */}
          <CiUser className="cursor-pointer" size={24} />
        </div>
        <Link href="/" className="cart absolute left-4 md:left-16 top-6 flex gap-6">
          <IoArrowBack size={16} className="my-auto" />
          <span className="hidden md:inline">
            Back to Home
          </span>
        </Link>
        <div className='text-center p-4 text-red-400 font-semibold text-4xl'>Your Cart</div>
        {loading ?
          <>
            <div className="animate-spin">
            <Image src={ldimg} width={50} height={50} alt='some' />
            </div>
          </> :
          <div className='flex flex-row gap-4 flex-wrap justify-center'>
            {cartitem && cartitem.map((item, index) => {
              return (
                <>
                  <div className='min-w-72 flex flex-row justify-between rounded-lg p-2 hover:border-b-2 shadow-md hover:bg-violet-100 text-black transition-all ease-in-out bg-gray-200 h-40' key={index}>
                    <div>
                      <div className='text-lg font-semibold '>Name- {item.name}</div>
                      <div className='text-lg font-semibold '>Price- {item.price}</div>
                      <div className='text-lg font-semibold '>Quantity- {item.quantity}</div>
                    </div>
                    <div>
                      <button onClick={()=>Delete(item)} className='mt-2 bg-red-600 px-1 p-1 font-semibold rounded-md text-lg relative top-24 text-white'>Remove</button>
                    </div>




                  </div>
                </>
              )
            })}
          </div>
        }

        <button onClick={handlecheckout} className='mt-4 bg-green-600 px-4 p-2 font-semibold rounded-lg text-xl text-white'>Checkout</button>
      </div>
    </>
  )
}

export default Cart