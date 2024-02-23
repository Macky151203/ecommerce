import { NextRequest,NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function POST(request:NextRequest) {
    const d=await request.json()
    
    
    const {product,name,price,quantity}=d[0]
    const uid=d[1].id
    console.log(uid)
    const {data,error}= await db.from('cart').insert([{userid:uid,product:product,name:name,price:price,quantity:quantity}]).select()
    console.log(error)
    if(data){

        return NextResponse.json({msg:"success"})
    }
    return NextResponse.json({msg:"error"})

    
}   