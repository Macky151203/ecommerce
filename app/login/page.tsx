'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { RocketIcon } from "@radix-ui/react-icons"
import Link from 'next/link'
import React from 'react'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { CiShoppingCart, CiUser } from 'react-icons/ci'
import { IoArrowBack } from 'react-icons/io5'

function LoginPage() {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [err, seterr] = useState(false)
    const [sgnup, setsgnup] = useState(false)
    const [user, setuser] = useState('0')

    const router = useRouter()
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function getuser() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setuser(user?.id)
            }
        }
        getuser()
    }, [])

    const handlesignup = async () => {
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`
            }
        })
        setsgnup(true)
        router.refresh()
        setemail('')
        setpassword('')

    }
    const handlesignin = async () => {
        const res = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if (res.data.user === null) {
            console.log("invalid email/password")
            seterr(true)
        }

        console.log(res.data.user?.id)
        router.refresh()
        if (res.data.user !== null) {
            router.push('/')
        }
        setemail('')
        setpassword('')
    }

    if (user !== '0') {
        router.push('/')
    }

    return (
      <>
      <div className='overflow-x-hidden'>
      <div className="grid w-[100vw]  place-items-center my-4">
          <Link href="/" className="nav text-red-500 text-3xl font-semibold">
            HEXA
          </Link>
        </div>
        <div className=" cart absolute right-4 md:right-16 top-6 flex gap-4">
          {/* <Link href="/cart">
          <CiShoppingCart className="cursor-pointer" size={24} />
          </Link> */}
          <CiUser className="cursor-pointer" size={24} />
        </div>
        <Link href="/" className="cart absolute left-4 md:left-16 top-6 flex gap-6">
          <IoArrowBack size={16} className="my-auto" />
          <span className="hidden md:inline">
            Back to Home
          </span>
        </Link>
      </div>
        <div className='bg-gray-900 flex overflow-x-hidden flex-col items-center w-full h-screen'>


            <div className='flex pt-12 flex-col justify-center items-center'>
                <div className='m-4 text-red-500 text-4xl'>Hexa Login</div>
                <input className='p-2 pl-4 w-80 m-2 rounded-lg' placeholder='enter email' type='email' name='email' value={email} onChange={(e) => setemail(e.target.value)} />
                <input className='p-2 pl-4 w-80 m-2 rounded-lg' placeholder='enter password' type='password' name='password' value={password} onChange={(e) => setpassword(e.target.value)} />
                <button className='bg-red-500 p-2 rounded-lg w-40 m-2 text-white' onClick={handlesignin}>sign in</button>
                <button className='bg-red-500 p-2 rounded-lg w-40 m-2 text-white' onClick={handlesignup}>sign up</button>
            </div>
            {err ?
                <Alert variant="destructive" className='mt-2'>
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Invalid Email / Password
                    </AlertDescription>
                </Alert> : <></>}
            {
                sgnup ? <>
                    <Alert className='mt-2'>
                        <RocketIcon className="h-4 w-4" />
                        <AlertTitle>Mail Confirmation</AlertTitle>
                        <AlertDescription>
                            Check your given main and click confirm email.
                        </AlertDescription>
                    </Alert>
                    </> : <></>
            }


        </div>
        </>
    )
}

export default LoginPage