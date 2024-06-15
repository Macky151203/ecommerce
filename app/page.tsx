'use client'
import Image from 'next/image'
import getStipePromise from './lib/stripe'
import BgImage from '../app/images/beardface1.png'
// import vid from '../app/videos/hexavideo.mp4'
import Navbar from '@/components/navbar';
import { AuthProvider } from './context/authcontext';
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
// import ReactPlayer from 'react-player';
// import Videoplayer from '@/components/videoplayer';

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
    product: 1,
    name: "Casual Pink Shirt",
    price: 1000,
    quantity: 1,
  },
  {
    product: 2,
    name: "Casual Black Shirt",
    price: 1500,
    quantity: 1,
  },
  {
    product: 3,
    name: "Casual Pink Shirt",
    price: 500,
    quantity: 1,
  },
  {
    product: 4,
    name: "Casual Green Shirt",
    price: 500,
    quantity: 1,
  },
];


export default function Home() {

  const [mail, setmail] = useState('')

  const mailfunc = async () => {
    const res = await fetch('/api/sendmail/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-cache",
      body: JSON.stringify({ mail })
    })
    const data = await res.json();
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
  // <div className='flex justify-center'>
  //           <div className='bg-black w-1/2 h-[1px]'></div>
  //       </div>

  return (
    <AuthProvider>
      <div className='max-w-full bg-gray-100 overflow-x-hidden'>

        {/* <div className="circle bg-gray-100 absolute rounded-full"></div> */}
        <div className='h-screen bg-gradient-to-r from-white to-violet-300'>
          <Navbar />
          <div className=" pt-16 flex-col  flex lg:flex-row  text-black">
            {/* <div className='flex h flex-col lg:flex-row'>
    <div className="hero-content w-full md:w-1/2 absolute flex justify-around flex-col lg:my-12 my-8 mx-auto">
      <h1 className="py-5 font-normal text-3xl md:text-5xl lg:text-6xl xl:text-7xl">Enhance Your Daily Routine</h1>
      <p className="py-2 text-sm md:text-md lg:text-lg xl:text-xl ">fkjvnrtvhrnvlrtblrtbj  jknvtrbjnrbyjtbnytj</p>
    </div>
    <Image src={BgImage} alt="Trimming beard" className="hidden lg:absolute sm:flex md:bottom-0 -bottom-96 mx-20" />
  </div> */}
            <div className='md:w-1/2 z-20 flex-col flex gap-8  lg:pl-12 text-black   h-full'>
              <div className='text-6xl text-center my-4 md:text-left md:w-2/3 md:pl-24 relative sm:top-1/4'>Enhance Your Daily Fashion</div>
              <div className='relative sm:top-1/4 px-4 text-xl md:pl-24 text-center md:text-left md:w-2/3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, tempora. Quibusdam magnam minima vel neque quasi</div>
            </div>
            <div className='md:w-1/2 h-full'>
              <Image src={BgImage} alt="Trimming beard" className="z-10 absolute bottom-0 " />
            </div>
          </div>
        </div>

        {/* video */}
        {/* <div className='bg-white'>
  <Videoplayer />
</div> */}

        {/* tabs */}
        <div className='bg-violet-300 pb-6'>
          <div className='flex flex-col gap-8 pt-12 justify-center items-center bg-violet-300'>
            <div className='text-5xl text-gray-800'>New Arrivals</div>
            <div className='text-xl md:w-1/2 p-1 text-center text-gray-800'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, autem est ipsum reiciendis voluptate magni temporibus itaque facilis quos tenetur!</div>
          </div>
          <div className='mt-8 flex justify-center items-center'>
            <Tabs defaultValue="Base" className="w-4/5 flex flex-col justify-center items-center">
              <TabsList className=''>
                <TabsTrigger value="Base" className='text-center'>Base</TabsTrigger>
                <TabsTrigger value="Premium" className='text-center'>Premium</TabsTrigger>
              </TabsList>
              <TabsContent className='flex  flex-col lg:flex-row gap-x-8' value="Base">
                <Productcard name={products[0].name} id={1} price={1000} img="img1" />
                <Productcard name={products[1].name} id={2} price={1500} img="img2" />
                <Productcard name={products[2].name} id={3} price={500} img="img3" />
              </TabsContent>
              <TabsContent className='flex  flex-col lg:flex-row gap-x-8' value="Premium">
                {/* <Productcard id='1' />
        <Productcard id='2' />
        <Productcard id='3' /> */}
                

                 
                  <Productcard name={products[3].name} id={6} price={1500} img="img2" />
                  {/* <Productcard id={3} price={500} img="img3" /> */}

              </TabsContent>
            </Tabs>

          </div>
        </div>


        {/* carousel */}

        {/* <div className='w-full h-[1px] bg-black py-8'></div> */}
        <div className='bg-white flex flex-col justify-center items-center pb-8  pt-8'>
          <div className='flex text-center flex-col justify-center items-center gap-4  m-4 mb-12'>
            <div className='lg:text-4xl text-black text-3xl font-semibold'>This is what our customers say about us</div>
            <div className='text-black text-xl'>Hear the review from our customers they have written it by themselves</div>
          </div>
          <Carousel className='w-2/3 '>
            <CarouselContent className=''>
              {reviewdata.map((data, i) => {
                return (
                  <>
                    <CarouselItem key={data.name} className=" bg-gray-100 rounded-sm g:basis-1/1 xl:basis-1/2 md:basis-1/1">
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
        {/* <div className='w-full  bg-black '></div> */}
        <div className='flex flex-col bg-violet-300 pb-16 pt-16 justify-center items-center'>
          <div className='lg:text-4xl text-3xl text-center font-semibold text-gray-800'>SignUp for Newsletter</div>
          <div className='lg:w-1/2 mt-4 text-center text-gray-800'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus vitae ipsa, nisi sunt facere, neque doloribus voluptas temporibus laborum quas ad aspernatur, eos dolor corrupti minus vero fugit deleniti sint!</div>

          <div><input onChange={(e) => setmail(e.target.value)} value={mail} className='rounded-md w-72 md:w-96 m-4 mt-8 pl-4 h-12 p-1' placeholder='name@mail.com' type='email' required /></div>
          <div><button onClick={mailfunc} className='p-2 w-72 h-12 rounded-lg bg-red-600 text-white text-center hover:bg-red-400 transition ease-in-out '>Subscribe Now</button></div>

        </div>

        {/* footer */}
        <div className='w-full h-[2px] bg-white'></div>
        <div className='bg-violet-300 flex-col flex justify-center gap-2 items-center w-full h-30 py-4'>
          <div className='md:text-4xl font-semibold text-2xl text-gray-800'>Hexa</div>
          <div className=' text-gray-600'>Copyright © 2024. All Rights Reseved.</div>
        </div>





      </div>
    </AuthProvider>
  )
}
