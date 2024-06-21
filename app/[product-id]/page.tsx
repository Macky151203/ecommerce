'use client'

import Link from "next/link";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
import { useState, useEffect, SetStateAction } from "react";
import getStipePromise from "../lib/stripe";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from "@/components/ui/use-toast"

export default function Page({ params }: { params: { "product-id": string } }) {
  //console.log(params["product-id"])
  const [usr, setuser] = useState('0')
  const supabase = createClientComponentClient();
  const { toast } = useToast()
  const router = useRouter()
  let products = [
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
      name: "Casual Blue Shirt",
      price: 500,
      quantity: 1,
    },
    {
      product: 6,
      name: "some",
      price: 800,
      quantity: 1,
    },
    {
      product: 6,
      name: "some",
      price: 800,
      quantity: 1,
    },
    {
      product: 6,
      name: "Casual Green Shirt",
      price: 800,
      quantity: 1,
    },
  ];
  // const [prod, setprod] = useState(products)
  const [qty, setqty] = useState('1')
  const [kv_arr, setKv] = useState([])
  const [about_Arr, setAbt] = useState([])
  let product;
  let about: { [x: string]: any; };
  const changeqty = async (e) => {
    setqty(e.target.value)
    // console.log("selected qty")
    // console.log(qty)

  }
  const tocart = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setuser(user?.id)
    }
    let updatedprod = products.map(obj => String(obj.product) === String(params["product-id"]) ? { ...obj, quantity: qty } : obj)
    //console.log(updatedprod)
    products = updatedprod
    const response = await fetch("/api/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([products[params["product-id"] - 1], user])
    })
    const data = await response.json()
    if (data.msg === "success") {
      console.log("Successfully added to cart")
      return toast({
        title: `Successfully added ${qty} item to cart`
      })
    }
  }
  const handlecheckout = async () => {
    let updatedprod = products.map(obj => String(obj.product) === String(params["product-id"]) ? { ...obj, quantity: qty } : obj)
    //console.log(updatedprod)
    products = updatedprod
    const stripe = await getStipePromise()
    const res = await fetch('/api/stripecheckout/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-cache",
      body: JSON.stringify([products[params["product-id"] - 1]])
    })
    const data = await res.json()
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id })
    }
  }
  useEffect(() => {
    const isloggedin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      }
    }
    isloggedin()
    let f = async () => {
      try {
        //console.log("came here")

        let product_response = await fetch(`${window.location.origin}/productDet/${params["product-id"]}.json`)
        let productAbt_response = await fetch(`${window.location.origin}/productAbt/${params["product-id"]}.json`)
        product = await product_response.json()
        about = await productAbt_response.json()
        //console.log("about down")
        //  console.log(about)
        setKv([])
        setAbt([])
        for (let key in about) {
          setAbt(k => about[key])
          // console.log(about[key])
        }
        for (let key in product) {
          let kv = [key, product[key]]
          //console.log({ kv })
          setKv(k => [...k, kv])
        }
      } catch (e) {
        console.log({ e })
      }
    }
    f()
  }, [])
  return (
    <>
      <div className="overflow-x-hidden pb-4 text-black bg-white">
        <div className="grid w-[100vw] place-items-center my-4">
          <Link href="/" className="nav text-red-500 text-3xl font-semibold">
            HEXA
          </Link>
        </div>
        <div className=" cart absolute right-4 md:right-16 top-6 flex gap-4">
          <Link href="/cart">
          <CiShoppingCart className="cursor-pointer" size={24} />
          </Link>
          <CiUser className="cursor-pointer" size={24} />
        </div>
        <Link href="/" className="cart absolute left-4 md:left-16 top-6 flex gap-6">
          <IoArrowBack size={16} className="my-auto" />
          <span className="hidden md:inline">
            Back to Home
          </span>
        </Link>
        <div className="content lg:mx-16 mx-4 flex flex-col lg:flex-row min-h-[50vh]">
          <div className="imagedis lg:w-[50%] relative mt-6 ">
            <img src={`/productId/${params['product-id']}.jpg`} alt="product image" className="w-[60%] ml-[20%]" />
          </div>
          <div className="description lg:w-[50%] mt-6">
            <span className="font-bold text-2xl"> {products[params["product-id"] - 1].name} </span>
            <div className="flex mt-8 gap-16 flex-col lg:flex-row ">
              <div className="det">
                <table className="mb-4">
                  {kv_arr.map(([k, v]) => (
                    <tr className="">
                      <td className="font-bold pb-2 pr-2">{k}</td>
                      <td className="pb-2">{v}</td>
                    </tr>
                  ))}
                </table>
                <ul className="list-disc border-t-2 border-slate-400 ml-4 pt-4">
                  {about_Arr.map((v) => (
                    <li className="w-[100%] text-left">{v}</li>
                  ))}
                </ul>
              </div>
              <div className="qty md:w-[40%] lg:mt-[10%]">
                <div className="maincost border-violet-200 rounded-md border-2 p-4">
                  <span className="text-bold mr-4">Qty :</span>
                  <select value={qty} onChange={changeqty} className="border-black text-black border-2">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <p>selected qty- {qty}</p>
                  <div className="cost relative mt-8 w-fit">
                    <span className="absolute top-[-10%]">₹</span><span className="text-2xl mt-6 ml-2">{products[params["product-id"] - 1].price}</span>
                  </div>
                  <div className="buy mt-6">
                    <button onClick={tocart} className="rounded-3xl bg-violet-500 text-white hover:bg-violet-300 w-[100%] py-2">Add to cart</button>
                    <button onClick={handlecheckout} className="mt-4 rounded-3xl flex justify-center items-center bg-white text-black hover:bg-violet-500 hover:text-white border-2 border-violet-400  w-[100%] py-2">Buy now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
