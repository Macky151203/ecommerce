'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import React from 'react'

function LoginPage() {

    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const router=useRouter()
    const supabase=createClientComponentClient();

    const handlesignup= async()=>{
        await supabase.auth.signUp({
            email,
            password,
            options:{
                emailRedirectTo:`${location.origin}/auth/callback`
            }
        })
        router.refresh()
        setemail('')
        setpassword('')
        
    }
    const handlesignin= async()=>{
        const res=await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(res.data.user===null){
            console.log("invalid email/password")
        }
        
        console.log(res.data)
        router.refresh()
        if(res.data.user!==null){
            router.push('/')
        }
        setemail('')
        setpassword('')
    }

  return (
    <div>
        <div className='flex flex-col justify-center items-center'>
            <input type='email' name='email' value={email} onChange={(e)=>setemail(e.target.value)} />
            <input type='password' name='password' value={password} onChange={(e)=>setpassword(e.target.value)} />
            <button onClick={handlesignin}>sign in</button>
            <button onClick={handlesignup}>sign up</button>
        </div>


    </div>
  )
}

export default LoginPage