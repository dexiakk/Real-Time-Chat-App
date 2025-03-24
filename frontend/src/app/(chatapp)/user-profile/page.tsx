"use client"
import { useUser } from '@/app/context/UserContext'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/app/lib/utils'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import SideBar from '../components/SideBar'

export default function page() {
  const user = useUser().user
  const router = useRouter()

  const handleLogout = () => {

    document.cookie = `${ACCESS_TOKEN}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    document.cookie = `${REFRESH_TOKEN}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

    router.push("/auth/")
  }

  return (
    <div className='w-full h-screen flex justify-center items-center gap-7'>
      <SideBar />
      <div className='h-[80%] flex flex-col justify-between overflow-y-auto disableScrollbar bg-[#1F1F1F] py-12 px-14 text-white border-4 border-[#D8BFD8] rounded-[23px]'>
        <div className='bg-[#3A3A3A] flex items-center gap-3 py-7 pl-8 pr-10 rounded-[23px]'>
          <div>
            <Image
              src={`${user?.avatar ? `http://127.0.0.1:8000${user.avatar}` : "/user/user-icon.png"}`}
              width={80}
              height={80}
              alt='user-icon'
              className='object-cover rounded-full'
            />
          </div>

          <div>
            <p className='font-semibold text-[19px] mb-[-2px]'>{user?.username && user.username}</p>
            <p className='font-semibold text-gray-400 text-[14px]'>{user?.email && user.email}</p>

          </div>
        </div>

        <div className='w-full'>
          <Button onClick={handleLogout} className='w-full bg-[#9E689E] hover:bg-[#402640] text-gray-100'>Logout</Button>
        </div>
      </div>
    </div>
  )
}
