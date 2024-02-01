'use client'

import Link from "next/link";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { usePathname } from 'next/navigation'
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
export default function Page({ params }: { params: { "product-id": string } }) {
    const [kv_arr,setKv] = useState([])
    const [about_Arr,setAbt] = useState([])
    let product;
    let about;
    useEffect(()=>{
        let f = async()=>{
            try{
                console.log("came here")
                let product_response = await fetch(`${window.location.origin}/productDet/${params["product-id"]}.json`)
                let productAbt_response = await fetch(`${window.location.origin}/productAbt/${params["product-id"]}.json`)
                product = await product_response.json()
                about = await productAbt_response.json()
                setKv([])
                setAbt([])
                for(let key in about){
                    setAbt(k=>about[key])
                    console.log(about[key])
                }
                for(let key in product){
                    let kv = [key,product[key]]
                    console.log({kv})
                    setKv(k=>[...k,kv])
                }
            }catch(e){
                console.log({e})
            }
        }
        f()
    },[])
  return( 
  <>
    <div className="grid w-[100vw] place-items-center my-4">
        <Link href="/" className="nav text-3xl font-semibold">
        HEXA
        </Link>
    </div>
    <div className=" cart absolute right-4 md:right-16 top-6 flex gap-4">
        <CiShoppingCart className="cursor-pointer" size={24}/>
        <CiUser className="cursor-pointer" size={24}/>
    </div>
    <Link href="/" className="cart absolute left-4 md:left-16 top-6 flex gap-6">
        <IoArrowBack size={16} className="my-auto"/>
        <span className="hidden md:inline">
            back to home
        </span>
    </Link>
    <div className="content lg:mx-16 mx-4 flex flex-col lg:flex-row min-h-[50vh]">
        <div className="imagedis lg:w-[50%] relative mt-6 ">
            <img src={`/productId/${params['product-id']}.jpg`} alt="product image" className="w-[60%] ml-[20%]"/>
        </div>
        <div className="description lg:w-[50%] mt-6">
            <span className="font-bold text-2xl"> Beard Shaping Tool | Customized | Its your standard | only for standard Men </span>
            <div className="flex mt-8 gap-16 flex-col lg:flex-row ">
                <div class="det">
                    <table className="mb-4">
                    {kv_arr.map(([k,v])=>(
                        <tr className="">
                            <td className="font-bold pb-2 pr-2">{k}</td>
                            <td className="pb-2">{v}</td>
                        </tr>
                    ))}
                    </table>
                    <ul className="list-disc border-t-2 border-slate-400 ml-4 pt-4">
                        {about_Arr.map((v)=>(
                            <li className="w-[100%] text-left">{v}</li> 
                        ))}
                    </ul>
                </div>
                <div className="qty w-[40%] lg:mt-[10%]">
                 <div className="maincost border-black border-2 p-4">
                     <span className="text-bold mr-4">Qty :</span>
                     <select className="border-black border-2">
                         <option>1</option>
                         <option>2</option>
                         <option>3</option>
                         <option>4</option>
                         <option>5</option>
                     </select>
                     <div className="cost relative mt-8 w-fit">
                         <span className="absolute top-[-10%]">₹</span><span className="text-2xl mt-6 ml-2">501</span><span className="absolute right-[-39%] top-[-10%]">00</span>
                    </div>
                    <div className="buy mt-6">
                        <button className="block rounded-3xl border-black border-2 w-[100%] py-2">add to cart</button>
                        <button className="block mt-4 rounded-3xl bg-black text-[wheat] border-2 w-[100%] py-2">buy now</button>
                    </div>
                 </div>
                </div>
            </div>
        </div>
    </div>
  </>

)}
