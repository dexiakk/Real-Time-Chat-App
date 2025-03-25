import React from 'react'
import { Friend, User } from '../chatapp/page';
import { RoundedIcon } from './RoundedIcon';
import { useUser } from '@/app/context/UserContext';

interface AvailableChatsAreaProps {
    setCurrentChat: any;
    setCurrentChatDetails: any;
    type: string;
}


export default function AvailableChatsArea({ setCurrentChat, setCurrentChatDetails, type }: AvailableChatsAreaProps) {
    const user = useUser().user
    return (
        <div>
            <div className='mt-0 sm:mt-4 mb-4'>
                <p className='font-bold text-[#D8BFD8] text-[14px] sm:text-[20px]'>{type === "Friend" ? "Friends" : "Group Chats"}</p>
                <hr className='bg-[#D8BFD8] h-[3px] border-none' />
            </div>

            <div className='h-full min-h-[150px] overflow-y-auto disableScrollbar'>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5'>
                    {user && user.friends.map((friend: Friend, index) => (
                        <div
                            key={index}
                            className='flex flex-col items-center cursor-pointer select-none'
                            onClick={() => { setCurrentChat(friend.username); setCurrentChatDetails(friend) }}
                        >
                            <RoundedIcon
                                key={index}
                                image={friend.avatar}
                                text={friend.username}
                                type='user'
                            />
                            <p>{friend.username}</p>
                        </div>
                    ))}

                    <div className='flex flex-col items-center cursor-pointer'>
                        <RoundedIcon image={"/user/add.png"} text="Add" type='add' />
                        <p>Add {type}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
