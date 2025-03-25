"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@/app/context/UserContext';
import api from '@/app/lib/api';
import ChatWindow from '../components/ChatWindow';
import SideBar from '../components/SideBar';
import UserChatPanel from '../components/UserChatPanel';

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
        <div className='w-full h-screen flex flex-col sm:flex-row justify-center items-center px-4 md:px-0'>
            <div className='h-[80%] hidden lg:block'>
                <SideBar />
            </div>

            <div className='min-h-[30%] sm:h-[80%] overflow-y-auto disableScrollbar bg-[#1F1F1F] mt-8 sm:mt-0 py-3 sm:py-5 md:py-12 px-4 md:px-14 text-white border-4 border-[#D8BFD8] rounded-[23px]'>
                <UserChatPanel setCurrentChat={setCurrentChat} setCurrentChatDetails={setCurrentChatDetails} />
            </div>

            <div className={`${chatVisibility} h-screen flex items-center sm:ml-7`}>
                <ChatWindow chatId={chatId} currentChatDetails={currentChatDetails} />
            </div>
        </div>
    )
}