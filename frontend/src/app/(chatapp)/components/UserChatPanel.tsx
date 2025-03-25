import React from 'react'
import AvailableChatsArea from './AvailableChatsArea'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Progress } from '@radix-ui/react-progress'
import Image from 'next/image'
import { useUser } from '@/app/context/UserContext'
import SideBar from './SideBar'

interface UserChatPanelProps {
    setCurrentChat: any;
    setCurrentChatDetails: any;
}

export default function UserChatPanel({ setCurrentChat, setCurrentChatDetails }: UserChatPanelProps) {
    const user = useUser().user
    return (
        <div className='h-full flex flex-row gap-4 sm:gap-0 sm:flex-col'>
            <div className='flex flex-col gap-2'>
                <div className='bg-[#3A3A3A] flex items-center justify-center lg:justify-start gap-3 py-4 md:py-7 pl-2 md:pl-10 lg:pl-8 pr-2 md:pr-10 rounded-[23px]'>
                    <div className='relative min-w-[40px] sm:min-w-[80px] h-[40px] sm:h-[80px]'>
                        <Image
                            src={`${user?.avatar ? `http://127.0.0.1:8000${user.avatar}` : "/user/user-icon.png"}`}
                            fill
                            alt='user-icon'
                            className='object-cover rounded-full'
                        />
                    </div>

                    <div className='hidden lg:block'>
                        <p className='font-semibold text-[19px] mb-[-2px]'>{user?.username && user.username}</p>
                        <p className='font-semibold text-gray-400 text-[14px]'>{user?.email && user.email}</p>

                        <p className='text-[#9E689E] text-[14px] font-semibold mb-[1px]'>Friends:&nbsp;{user?.friends.length && user.friends.length}</p>

                        <Progress value={user?.friends.length ? user.friends.length * 10 : 0} />

                    </div>

                    <div className='hidden xl:block ml-8'>
                        <Link href={"/user-profile/"}>
                            <Button className='bg-[#9E689E] hover:bg-[#402640] text-gray-100'>Edit Profile</Button>
                        </Link>
                    </div>
                </div>

                <div className='block lg:hidden'>
                    <SideBar />
                </div>
            </div>

            <AvailableChatsArea
                setCurrentChat={setCurrentChat}
                setCurrentChatDetails={setCurrentChatDetails}
                type="Friend"
            />

            <AvailableChatsArea
                setCurrentChat={setCurrentChat}
                setCurrentChatDetails={setCurrentChatDetails}
                type="Group"
            />
        </div>
    )
}
