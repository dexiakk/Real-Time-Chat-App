import Image from "next/image";

interface RoundedIconProps {
    image: string | null;
    text: string;
    type: string;
}

export const RoundedIcon = ({ image, text, type }: RoundedIconProps) => {
    return (
        <div className="relative w-[80px] h-[80px] bg-gray-400 rounded-full hover:rounded-[13px] overflow-hidden group">
            {type === "user" && image ?
                (
                    <Image src={`http://127.0.0.1:8000${image}`} fill objectFit="cover" alt={text} />
                )
                :
                (
                    <Image src={"/user/user-icon.png"} fill objectFit="cover" alt={text} />
                )}
            {type === "add" && image && (
                <Image src={image} fill objectFit="cover" alt={text} />
            )}
        </div>
    )
}