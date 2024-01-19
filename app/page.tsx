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
    <div>
      <div className='flex flex-col justify-center text-white items-center bg-slate-200'>
        <button onClick={handlecheckout} className='rounded-md w-48 text-xl bg-green-500 p-2 m-4'>Checkout</button>
        <Link href='/product/1'><div className='bg-red-500 m-4 p-2 text-xl rounded-lg'>Product 1</div></Link>
        <Link href='/product/2'><div className='bg-red-500 m-4 p-2 text-xl rounded-lg'>Product 2</div></Link>
        <Link href='/product/3'><div className='bg-red-500 m-4 p-2 text-xl rounded-lg'>Product 3</div></Link>
      </div>


      {/* carousel */}
      {/* <CarouselItem className="md:basis-1/2 lg:basis-1/2">
              <div className='bg-slate-300 rounded-lg m-4'>
                item1
              </div>
            </CarouselItem> */}
      <div className='flex flex-row justify-center items-center mt-8'>
        <Carousel className='w-2/3'>
          <CarouselContent className=''>
            {reviewdata.map((data, i) => {
              return (
                <>
                  <CarouselItem key={data.name} className="lg:basis-1/2">
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


    </div>
  )
}
