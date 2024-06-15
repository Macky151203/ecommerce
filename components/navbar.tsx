'use client'
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Ham from '../app/images/ham.png'
import Image from 'next/image';

function Navbar() {
    const [open, setopen] = useState(true)
    const [user, setuser] = useState('0')
    const supabase = createClientComponentClient();
    const router = useRouter()

    const handlesignout = async () => {
        await supabase.auth.signOut()
        router.refresh()
        setuser('0')
    }

    useEffect(() => {
        async function getuser() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setuser(user?.id)
            }
        }
        getuser()
    }, [])

    return (
        <>
        <nav className="md:text-black text-white text-lg p-4 z-30 s md:flex flex-row justify-between px-12 items-center relative z-0">
            <div className="flex flex-row justify-between">
                <div className='text-3xl font-semibold text-red-600'>Hexa</div>
                <span className="md:hidden block cursor-pointer"><button onClick={() => setopen(!open)}  ><Image className="w-8" src={Ham} alt={''} /></button></span>
            </div>



            <ul className={`top-16 transition-all font-semibold gap-6 ease-in duration-300 ${open ? 'opacity-0 md:opacity-100' : ''}   md:py-0 py-4 pl-2 md:pl-0 w-full md:w-auto left-0 md:flex flex-row md:items-center bg-black z-[-1] md:z-auto md:static absolute  md:bg-transparent`}>
                <Link href='/'><li className="mx-1 md:my-0 my-6 cursor-pointer hover:text-black">Home</li></Link>
                <Link href='/'><li className="mx-1 md:my-0 my-6 cursor-pointer hover:text-black">About</li></Link>
                <Link href='/cart'><li className="mx-1 md:my-0 my-6 cursor-pointer hover:text-black">Cart</li></Link>
                {/* <li className="mx-4 md:my-0 my-6 cursor-pointer hover:text-violet-600">Resources</li> */}
                {user !== '0' ? <li onClick={handlesignout} className='mx-1 md:my-0 my-6 cursor-pointer hover:text-black'>Log out</li> : <li className='mx-4 md:my-0 my-6 cursor-pointer hover:text-black'><Link href="/login">Login/Signup</Link></li>}


            </ul>
            
        </nav>
        <div className='flex justify-center'>
            <div className='bg-black md:w-1/2 h-[1px]'></div>
        </div>
        </>
    )
}

export default Navbar
