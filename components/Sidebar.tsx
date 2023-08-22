"use client"

import { MdDashboard } from 'react-icons/md'
import { BsFillEnvelopePaperFill } from 'react-icons/bs'
import { FaBuilding, FaUsers, FaLightbulb, FaArrowUp } from 'react-icons/fa'
import { sidebarlinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLoading } from '@/hooks/useLoading'

const Sidebar = () => {
    const pathname = usePathname()
    const [user, setUser] = useState<any>()
    const { setLoading } = useLoading()

    useEffect(() => {
        setLoading(true)
        const fetchUser = async () => {
          const res = await fetch('/api/users/getUser')
          const data = await res.json()
    
          if(res.ok){
            setUser(data)
            setTimeout(() => {
                setLoading(false)
            }, 2000);
          }
        }
    
        fetchUser()
    }, [])

    return (
        <section className='p-10 flex flex-col items-start shadow-2xl rounded-tr-2xl'>
            <Image
                src="/logo.png"
                alt="logo"
                width={200}
                height={200}
            />
            <div className='mt-[33px] flex flex-col space-y-[30px]'>
                {
                    sidebarlinks.map((item) => {
                        const isActive = (pathname.includes(item.link) && item.link.length > 1) || pathname === item.link
                        return (
                            <Link key={item.title} href={item.link} className={`flex items-center gap-[16px] px-5 w-[190px] h-[46px] text-[14px] capitalize rounded-[18px] ${isActive ? "bg-[#1B59F81A] text-[#1B59F8] font-[500] duration-200" : ""}`}>
                                {
                                    item.icon === 1 && (
                                        <MdDashboard className="text-lg" />
                                    )
                                }
                                {
                                    item.icon === 2 && (
                                        <BsFillEnvelopePaperFill className="text-lg" />
                                    )
                                }
                                {
                                    item.icon === 3 && (
                                        <FaBuilding className="text-lg" />
                                    )
                                }
                                {
                                    item.icon === 4 && (
                                        <FaUsers className="text-lg" />
                                    )
                                }
                                <p>
                                    {item.title}
                                </p>
                            </Link>
                        )
                    })
                }
            </div>
            <div className='mt-[60px]'>
                <p className='font-[600] text-gray-400'>Support</p>
                <div className='mt-[25px]'>
                    <Link href="/support" className={`flex items-center gap-[16px] px-5 w-[190px] h-[46px] text-[14px] capitalize rounded-[18px]`}>
                        <FaLightbulb className="text-lg" />
                        <p>
                            Contact support
                        </p>
                    </Link>
                </div>
            </div>
            <div className='flex h-full justify-start w-full items-end'>
                <div className='flex justify-between border-t-2 border-black w-full shadow-lg px-5 py-4 rounded-xl'>
                    <div className='flex flex-col'>
                        <h1 className='text-[14px] capitalize font-bold leading-[18px]'>
                            {user && user.data.fullName}
                        </h1>
                        <p className='text-gray-500 capitalize
                         text-[12px]'>
                            {user && user.data.role}
                        </p>
                    </div>
                    <button>
                        <FaArrowUp />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Sidebar