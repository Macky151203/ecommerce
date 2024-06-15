import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  const { error } = await db
    .from("cart")
    .delete()
    .eq("id", id);
    if(error){
        return NextResponse.json({msg:"Error in removing product"})
    }
    return NextResponse.json({msg:"Removed the product from cart"})
}
