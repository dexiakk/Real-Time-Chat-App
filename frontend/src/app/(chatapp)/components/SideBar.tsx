import { useUser } from "@/app/context/UserContext"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SideBar() {
    const pathName = usePathname()
    const user = useUser().user

    return (

        <div className='flex flex-col items-center md:mt-6 md:px-2 md:py-3 md:mr-[-3px] bg-[#1F1F1F] md:border-[4px] border-[#D8BFD8] rounded-[13px]'>
            <Link href={"/chatapp/"}>
                <div className={`${pathName.endsWith('/chatapp') ? "bg-[#3A3A3A]" : ""} pt-4 px-4 pb-4 rounded-[13px] select-none`}>
                    <Image
                        src={"/chatapp/chat-icon.png"}
                        width={30}
                        height={30}
                        alt='chat-icon'
                    />
                </div>
            </Link>

            <Link href={"/user-profile/"}>
                <div className={`${pathName.endsWith('/user-profile') ? "bg-[#3A3A3A]" : ""} pt-4 px-4 pb-4 rounded-[13px] select-none`}>
                    <Image
                        src={`${user?.avatar ? `http://127.0.0.1:8000${user.avatar}` : "/user/user-icon.png"}`}
                        width={37}
                        height={37}
                        alt='chat-icon'
                        className="rounded-full"
                    />
                </div>
            </Link>
        </div>

    )
}
