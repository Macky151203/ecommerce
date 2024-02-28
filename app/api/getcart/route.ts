import { NextRequest,NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function POST(request:NextRequest){
    const d=await request.json()
    const uid=d.id
    console.log(uid)
    let {data,error}= await db.from('cart').select('*').eq('userid',uid)
    console.log(data)
    if(error){
        console.log(error)
    }
    return NextResponse.json({cartitem:data})
}