import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-3 bg-[#1F1F1F] border-[#D8BFD8] border-4 px-14 py-10 rounded-[23px]">
        <div className="text-3xl text-[#D8BFD8] font-semibold select-none">Welcome back!</div>
        <Link href={"/chatapp/"}>
          <Button className='w-full bg-[#9E689E] hover:bg-[#402640] text-gray-100'>Open Chat App</Button>
        </Link>
      </div>
    </div>
  );
}

