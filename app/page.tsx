'use client'
import Image from 'next/image'
import getStipePromise from './lib/stripe'
import BgImage from '../app/images/beardface1.png'
import Navbar from '@/components/navbar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Card from '@/components/card';
import Productcard from '@/components/productcard';
import { useState } from 'react';

const reviewdata = [
  {
    name: "name1",
    type: "traveller",
    review: "hvwkj jbskj iibsk sbkjca iuvbf iubdskbjck ubdsbckj kbksjdbc khkbkdc bdskjbc khbdksbc "
  },
  {
    name: "name1",
    type: "traveller",
    review: "hvwkj jbskj iibsk sbkjca iuvbf iubdskbjck ubdsbckj kbksjdbc khkbkdc bdskjbc khbdksbc "
  },
  {
    name: "name1",
    type: "traveller",
    review: "hvwkj jbskj iibsk sbkjca iuvbf iubdskbjck ubdsbckj kbksjdbc khkbkdc bdskjbc khbdksbc "
  },
  {
    name: "name1",
    type: "traveller",
    review: "hvwkj jbskj iibsk sbkjca iuvbf iubdskbjck ubdsbckj kbksjdbc khkbkdc bdskjbc khbdksbc "
  },
  {
    name: "name1",
    type: "traveller",
    review: "hvwkj jbskj iibsk sbkjca iuvbf iubdskbjck ubdsbckj kbksjdbc khkbkdc bdskjbc khbdksbc "
  },
  {
    name: "name1",
    type: "traveller",
    review: "hvwkj jbskj iibsk sbkjca iuvbf iubdskbjck ubdsbckj kbksjdbc khkbkdc bdskjbc khbdksbc "
  }
]

const products = [
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

  const [mail,setmail]= useState('')

  const mailfunc= async ()=>{
    const res=await fetch('/api/sendmail/',{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-cache",
      body: JSON.stringify({mail})
    })
    const data=await res.json();
    setmail('')
    console.log(data.message)
  }

  const handlecheckout = async () => {
    const stripe = await getStipePromise()
    const res = await fetch('/api/stripecheckout/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-cache",
      body: JSON.stringify(products)
    })
    const data = await res.json()
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id })
    }
  }

  return (
    <div className='max-w-full bg-red-500 overflow-x-hidden'>

      <div className="circle bg-black absolute rounded-full"></div>
      <div className='h-screen'>
        <Navbar />
        <div className=" pt-16 flex-col  flex lg:flex-row bg-red-500 text-gray-200">
          {/* <div className='flex h flex-col lg:flex-row'>
          <div className="hero-content w-full md:w-1/2 absolute flex justify-around flex-col lg:my-12 my-8 mx-auto">
            <h1 className="py-5 font-normal text-3xl md:text-5xl lg:text-6xl xl:text-7xl">Enhance Your Daily Routine</h1>
            <p className="py-2 text-sm md:text-md lg:text-lg xl:text-xl ">fkjvnrtvhrnvlrtblrtbj  jknvtrbjnrbyjtbnytj</p>
          </div>
          <Image src={BgImage} alt="Trimming beard" className="hidden lg:absolute sm:flex md:bottom-0 -bottom-96 mx-20" />
        </div> */}
          <div className='md:w-1/2 z-20 flex-col flex gap-8  text-white   h-full'>
            <div className='text-6xl text-center my-4 md:text-left md:w-2/3 md:pl-24 relative sm:top-1/4'>Enhance Your Daily Routine</div>
            <div className='relative sm:top-1/4 px-4 text-xl md:pl-24 text-center md:text-left md:w-2/3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, tempora. Quibusdam magnam minima vel neque quasi</div>
          </div>
          <div className='md:w-1/2 h-full'>
            <Image src={BgImage} alt="Trimming beard" className="z-10 absolute bottom-0 " />
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className='bg-black'>
        <div className='flex flex-col gap-8 pt-12 justify-center items-center bg-black'>
          <div className='text-5xl text-gray-500'>New Arrivals</div>
          <div className='text-xl md:w-1/2 p-1 text-center text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, autem est ipsum reiciendis voluptate magni temporibus itaque facilis quos tenetur!</div>
        </div>
        <div className='mt-8 flex justify-center items-center'>
          <Tabs defaultValue="Base" className="w-4/5 flex flex-col justify-center items-center">
            <TabsList className=''>
              <TabsTrigger value="Base" className='text-center'>Base</TabsTrigger>
              <TabsTrigger value="Premium" className='text-center'>Premium</TabsTrigger>
            </TabsList>
            <TabsContent className='flex  flex-col lg:flex-row gap-x-8' value="Base">
              <Productcard id='1' />
              <Productcard id='2' />
              <Productcard id='3' />
            </TabsContent>
            <TabsContent className='flex  flex-col lg:flex-row gap-x-8' value="Premium">
              {/* <Productcard id='1' />
              <Productcard id='2' />
              <Productcard id='3' /> */}
              <div className='text-white text-2xl'>
                Premium content not available right now.
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </div>


      {/* carousel */}

      <div className='w-full h-[1px] bg-black py-8'></div>
      <div className='bg-red-500 flex flex-col justify-center items-center pb-8  pt-8'>
        <div className='flex text-center flex-col justify-center items-center gap-4  m-4 mb-12'>
          <div className='lg:text-4xl text-black text-3xl font-semibold'>This is what our customers say about us</div>
          <div className='text-black text-xl'>Hear the review from our customers they have written it by themselves</div>
        </div>
        <Carousel className='w-2/3 '>
          <CarouselContent className=''>
            {reviewdata.map((data, i) => {
              return (
                <>
                  <CarouselItem key={data.name} className="lg:basis-1/1 xl:basis-1/2 md:basis-1/1">
                    <Card name={data.name} review={data.review} type={data.type} />
                  </CarouselItem>
                </>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

      </div>

      {/* newsletter */}
      <div className='w-full h-[1px] bg-black '></div>
      <div className='flex flex-col bg-black pb-16 pt-16 justify-center items-center'>
        <div className='lg:text-4xl text-3xl text-center font-semibold text-gray-500'>SignUp for Newsletter</div>
        <div className='lg:w-1/2 mt-4 text-center text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus vitae ipsa, nisi sunt facere, neque doloribus voluptas temporibus laborum quas ad aspernatur, eos dolor corrupti minus vero fugit deleniti sint!</div>
        
        <div><input onChange={(e)=>setmail(e.target.value)} value={mail} className='rounded-md bg-gray-200 w-72 md:w-96 m-4 mt-8 pl-4 h-12 p-1' placeholder='name@mail.com' type='email' required /></div>
        <div><button onClick={mailfunc}  className='p-2 w-72 h-12 rounded-lg bg-red-500 text-white text-center hover:bg-red-400 transition ease-in-out '>Subscribe Now</button></div>
        
      </div>

      {/* footer */}
      <div className='w-full h-[1px] bg-white '></div>
      <div className='bg-black flex-col flex justify-center gap-2 items-center w-full h-30 py-4'>
        <div className='md:text-3xl text-2xl text-red-700'>Hexa</div>
        <div className=' text-gray-500'>Copyright © 2024. All Rights Reseved.</div>
      </div>





    </div>
  )
}
