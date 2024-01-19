'use client'
import Image from 'next/image'
import getStipePromise from './lib/stripe'
import Link from 'next/link';
const products = [
  // {
  //   product: 1,
  //   name: "Stripe Product",
  //   price: 400,
  //   quantity: 3,
  // },
  {
    product: 2,
    name: "Tshirt",
    price: 1000,
    quantity: 1,
  },
  {
    product: 1,
    name: "shoes",
    price: 1500,
    quantity: 1,
  },
];

export default function Home() {
  
    const handlecheckout=async()=>{
      const stripe=await getStipePromise()
      const res=await fetch('/api/stripecheckout/',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        cache:"no-cache",
        body:JSON.stringify(products)
      })
      const data=await res.json()
      if(data.session){
        stripe?.redirectToCheckout({sessionId:data.session.id})
      }
    }
  
  return (
    <div className='flex flex-col justify-center items-center'>
      <button onClick={handlecheckout} className='rounded-md w-48 bg-green-500 p-2 m-4'>Checkout</button>
      <Link href='/product/1'><div className='bg-red-500 m-4 p-2 text-xl rounded-lg'>Product 1</div></Link>
      <Link href='/product/2'><div className='bg-red-500 m-4 p-2 text-xl rounded-lg'>Product 2</div></Link>
      <Link href='/product/3'><div className='bg-red-500 m-4 p-2 text-xl rounded-lg'>Product 3</div></Link>
    </div>
  )
}
