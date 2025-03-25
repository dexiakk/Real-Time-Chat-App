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
    <div className='w-full h-screen flex justify-center items-center gap-7 px-2 sm:px-0'>

      <div className='hidden md:block'>
        <SideBar />
      </div>

      <div className='w-full  max-w-[450px] h-[80%] flex flex-col justify-between overflow-y-auto disableScrollbar bg-[#1F1F1F] py-12 px-4 sm:px-14 text-white border-4 border-[#D8BFD8] rounded-[23px]'>
        <div className='flex justify-between items-center gap-2'>
          <div className='w-full bg-[#3A3A3A] flex flex-col sm:flex-row items-center gap-3 py-7 px-2 sm: pl-3 md:pl-8 md:pr-10 rounded-[23px]'>
            <div className='relative min-w-[80px] h-[80px]'>
              <Image
                src={`${user?.avatar ? `http://127.0.0.1:8000${user.avatar}` : "/user/user-icon.png"}`}
                width={80}
                height={80}
                alt='user-icon'
                className='object-cover rounded-full'
              />
            </div>

            <div className='text-center sm:text-start'>
              <p className='font-semibold text-[19px] mb-[-2px]'>{user?.username && user.username}</p>
              <p className='font-semibold text-gray-400 text-[14px]'>{user?.email && user.email}</p>

            </div>
          </div>
          <div className='block md:hidden'>
            <SideBar />
          </div>
        </div>

        <div className='h-full w-full flex flex-col items-start gap-4 mt-5'>

          <div className='w-full'>
            <p className='text-[16px] text-[#9E689E] font-semibold mb-2'>Change Avatar:</p>

            <div className='flex items-center gap-3'>

              <input
                className="w-full p-2 rounded bg-[#33333E] text-white px-4 focus:outline-none"
                placeholder='Aa'
                type='text'
              />

              <Button disabled className='bg-[#9E689E] hover:bg-[#402640] text-gray-100'>Save</Button>

            </div>
          </div>

          <div className='w-full'>
            <p className='text-[16px] text-[#9E689E] font-semibold mb-2'>Change Password:</p>

            <div className='flex items-center gap-3'>

              <input
                className="w-full p-2 rounded bg-[#33333E] text-white px-4 focus:outline-none"
                placeholder='Aa'
                type='text'
              />

              <Button disabled className='bg-[#9E689E] hover:bg-[#402640] text-gray-100'>Save</Button>

            </div>
          </div>
        </div>

        <div className='w-full'>
          <Button onClick={handleLogout} className='w-full bg-[#9E689E] hover:bg-[#402640] text-gray-100'>Logout</Button>
        </div>
      </div>
    </div>
  )
}
