"use client"
import { useUser } from '@/app/context/UserContext';
import api from '@/app/lib/api';
import { API_URL } from '@/app/lib/utils';
import { API_URL_WS } from '@/app/lib/utils';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

export default function ChatWindow({ chatId, currentChatDetails }: { chatId: any, currentChatDetails: any }) {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<{ username: string; message: string; czas: string }[]>([]);
    const username = useUser().user?.username

    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages])


    useEffect(() => {
        if (socket) socket.close();

        if (chatId.chat_id) {

            const newSocket = new WebSocket(`wss://${API_URL_WS}/ws/chat/${chatId.chat_id}/`);

            newSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setMessages((prev) => [...prev, data]);
            };

            setSocket(newSocket);

            return () => newSocket.close();
        }
    }, [chatId])

    useEffect(() => {
        const fetchmessages = async () => {
            if (chatId.chat_id) {
                const res = await api.get(`/api/chats/chat/get-messages/${chatId.chat_id}/`)

                if (res) {

                    console.log(res.data)
                    const mappedMessages = res.data.map((msg: any) => ({
                        username: msg.sender,
                        message: msg.content,
                        czas: new Date(msg.timestamp).toLocaleString(),
                    }))

                    setMessages(mappedMessages)
                }
            }
        }

        fetchmessages()
    }, [chatId])

    const sendMessage = () => {
        if (socket && message.trim() !== "") {
            socket.send(JSON.stringify({ username, message }));
            setMessage("")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") sendMessage();
    }


    return (
        <div className='w-full min-w-[350px] sm:min-w-[400px] xl:min-w-[450px] h-[90%] sm:max-h-[80%] sm:h-[80%] bg-[#1F1F1F] text-white border-4 border-[#D8BFD8] rounded-[23px] relative'>
            <div className='flex items-center gap-4 my-4 ml-8'>
                <div className='relative w-[50px] sm:w-[80px] h-[50px] sm:h-[80px] rounded-full'>
                    {currentChatDetails && currentChatDetails.avatar ? (
                        <Image
                            src={`http://127.0.0.1:8000${currentChatDetails.avatar}`}
                            fill
                            objectFit="cover"
                            alt="chatAvatar"
                            className='rounded-full'
                        />
                    ) : (
                        <div className="relative w-[50px] sm:w-[80px] h-[50px] sm:h-[80px] bg-gray-400 rounded-full overflow-hidden group">
                            <Image
                                src={"/user/user-icon.png"}
                                fill
                                objectFit="cover"
                                alt="chatAvatar"
                                className='rounded-full'
                            />
                        </div>
                    )}
                </div>
                <div className='text-[20px] font-medium'>
                    {currentChatDetails && (
                        <>
                            {currentChatDetails.username}
                        </>
                    )}
                </div>
            </div>

            <hr className='bg-[#D8BFD8] h-[3px] border-none mx-4 mb-2' />

            <div ref={chatRef} className='h-[calc(100%-165px)] sm:h-[calc(100%-195px)] overflow-y-auto disableScrollbar'>
                <div className='w-full flex flex-col items-center gap-3 text-white'>
                    {messages.map((message: any, index) => (
                        <div key={index} className={`w-full flex ${message.username == username ? " justify-end text-end" : " justify-start"}`}>
                            <div className={`px-4 py-2 sm:py-3 text-[13px] sm:text-[16px] rounded-[19px] ${message.username == username ? " mr-3 bg-[#9e689e]" : " ml-3 bg-[#402640]"}`}>
                                {message.message}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-full px-4 absolute bottom-5'>
                <input
                    className="w-full p-2 rounded bg-[#33333E] text-white px-4 focus:outline-none"
                    placeholder='Aa'
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
        </div>
    )
}
