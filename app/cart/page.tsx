'use client'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function Cart() {

  const supabase = createClientComponentClient();

  const [cartitem, setcartitem] = useState([])
  useEffect(() => {



    const func = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      // if (user) {
      //     setuser(user?.id)
      // }
      const response = await fetch('/api/getcart', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
      const data = await response.json()
      setcartitem(data.cartitem)
    }
    func()
  }, [])


  return (
    <>
      <div className='bg-black overflow-hidden w-screen h-screen flex flex-col items-center gap-2 text-white p-4'>
        <div className='text-center p-4 text-red-400 font-semibold text-4xl'>Your Cart</div>
        <div className='flex flex-row gap-4 flex-wrap justify-center'>
          {cartitem && cartitem.map((item, index) => {
            return (
              <>
                <div className='min-w-72 flex flex-row justify-between rounded-lg p-2 hover:border-b-2 border-red-400 hover:bg-gray-800 transition-all ease-in-out bg-gray-900 h-40' key={index}>
                  <div>
                    <div className='text-lg font-semibold '>Name- {item.name}</div>
                    <div className='text-lg font-semibold '>Price- {item.price}</div>
                    <div className='text-lg font-semibold '>Quantity- {item.quantity}</div>
                  </div>
                  <div>
                    <button className='mt-2 bg-red-600 px-1 p-1 font-semibold rounded-md text-lg relative top-24 text-white'>Remove</button>
                  </div>




                </div>
              </>
            )
          })}
        </div>
        <button className='mt-4 bg-green-600 px-4 p-2 font-semibold rounded-lg text-xl text-white'>Checkout</button>
      </div>
    </>
  )
}

export default Cart