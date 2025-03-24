"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useUser } from '@/app/context/UserContext';
import api from '@/app/lib/api';
import ChatWindow from '../components/ChatWindow';
import { Progress } from "@/components/ui/progress"
import AvailableChatsArea from '../components/AvailableChatsArea';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SideBar from '../components/SideBar';

export interface Friend {
    username: string;
    avatar: string | null;
}

export interface User {
    id: number;
    email: string;
    username: string;
    avatar: string | null;
    bio: string;
    is_online: boolean;
    last_seen: string;
    friends: Friend[];
}


export default function Home() {
    const [chatVisibility, setChatVisibility] = useState("hidden")
    const [currentChat, setCurrentChat] = useState<string | null>()
    const [chatId, setChatId] = useState("")
    const [currentChatDetails, setCurrentChatDetails] = useState<any>()
    const user = useUser().user


    useEffect(() => {
        if (user && currentChat) {
            chatVisibility !== "flex" ? setChatVisibility("flex") : ""

            const fetchChatId = async () => {
                const res = await api.get(`/api/chats/get-chat-id/${user?.username}/${currentChat}/`)

                setChatId(res.data)
            }

            fetchChatId()
        }


    }, [currentChat])

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <SideBar />
            <div className='h-[80%] overflow-y-auto disableScrollbar bg-[#1F1F1F] py-12 px-14 text-white border-4 border-[#D8BFD8] rounded-[23px]'>
                <div className='h-full flex flex-col'>
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

                            <p className='text-[#9E689E] text-[14px] font-semibold mb-[1px]'>Friends:&nbsp;{user?.friends.length && user.friends.length}</p>

                            <Progress value={user?.friends.length ? user.friends.length * 10 : 0} />

                        </div>

                        <div className='ml-8'>
                            <Link href={"/user-profile/"}>
                                <Button className='bg-[#9E689E] hover:bg-[#402640] text-gray-100'>Edit Profile</Button>
                            </Link>
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

            </div>
            <div className={`${chatVisibility} h-screen flex items-center ml-7`}>
                <ChatWindow chatId={chatId} currentChatDetails={currentChatDetails} />
            </div>
        </div>
    )
}