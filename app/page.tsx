'use client'
import Image from 'next/image'
import getStipePromise from './lib/stripe'
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Card from '@/components/card';

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
    <div className='max-w-full'>
      <div className='flex flex-col justify-center text-white items-center bg-slate-200'>
        <button onClick={handlecheckout} className='rounded-md w-48 text-xl bg-green-500 p-2 m-4'>Checkout</button>
        <Link href='/product/1'><div className='bg-red-500 m-4 p-2 text-xl rounded-lg'>Product 1</div></Link>
        <Link href='/product/2'><div className='bg-red-500 m-4 p-2 text-xl rounded-lg'>Product 2</div></Link>
        <Link href='/product/3'><div className='bg-red-500 m-4 p-2 text-xl rounded-lg'>Product 3</div></Link>
      </div>


      {/* carousel */}
      
      
      <div className='flex flex-col justify-center items-center mt-8'>
        <div className='flex text-center flex-col justify-center items-center gap-4  m-4 mb-12'>
          <div className='lg:text-4xl text-3xl font-semibold'>This is what our customers say about us</div>
          <div className='text-gray-500'>Hear the review from our customers they have written it by themselves</div>
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
      <div className='w-full h-[2px] bg-black my-8'></div>
      <div className='flex flex-col m-4 mt-16 justify-center items-center'>
            <div className='lg:text-4xl text-3xl text-center font-semibold'>SignUp for Newsletter</div>
            <div className='md:w-1/2 mt-4 text-center text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus vitae ipsa, nisi sunt facere, neque doloribus voluptas temporibus laborum quas ad aspernatur, eos dolor corrupti minus vero fugit deleniti sint!</div>
            <div><input className='rounded-md bg-gray-200 w-72 md:w-96 m-4 mt-8 h-12 p-1' placeholder='name@mail.com' type='text' /></div>
            <div><button className='p-2 w-72 h-12 rounded-lg bg-black text-white text-center '>Subscribe Now</button></div>
      </div>

      {/* footer */}
      <div className='bg-gray-300 flex-col flex justify-center gap-2 items-center w-full h-24 mt-12'>
            <div className='md:text-3xl text-2xl text-gray-700'>Hexa</div>
            <div className=' text-gray-500'>Copyright © 2024. All Rights Reseved.</div>
      </div>


    </div>
  )
}
