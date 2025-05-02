"use client"
import { FC } from 'react'
import { HiX } from "react-icons/hi";
import Image from 'next/image';
import { useSidebarContext } from '@/providers/SidebarProvider';
import Links from "./components/Links";
import { useSession } from '@/providers/SessionProvider';
import UserIcon from '../Icon/UserIcon';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = {}

const Sidebar: FC<Props> = () => {
  const { openSidebar, setOpenSidebar } = useSidebarContext()
  const {session, status} =useSession()
  const t = useTranslations("stat_bar")
  return (
    <div className='top-0 md:hidden fixed z-[6000] h-screen'>
      <div className={`bg-[#000] bg-opacity-70 fixed inset-0 z-[6000] ${openSidebar ? 'block w-screen h-screen' : 'hidden'}`} onClick={() => setOpenSidebar(false)} />
      <div
        className={`sm:none duration-300 linear fixed !z-[6000] flex min-h-full 
        flex-col bg-white shadow-2xl items-center justify-center shadow-white/5 transition-all
        ${openSidebar ? "translate-x-0" : "-translate-x-96"}`}
      >
        <span className="absolute top-2 right-2 block cursor-pointer xl:hidden text-black" 
        onClick={() => setOpenSidebar(false)} >
          <HiX size={20}/>
        </span>

        <div className={` flex flex-col items-center relative w-[210px]`}>
          <Image src="/photos/logobachkhoa.png" alt="Your image" width={100} height={100} />
        </div>
        
						
        <div className="relative w-full h-full flex flex-col justify-center cursor-pointer">
				{status =="authenticated" ? session && session.avaUrl?
        <div className="flex mr-auto ml-auto right-0 left-0 w-fit flex-col gap-2 ">
          <div className="w-14 h-14 hover:cursor-pointer 
          rounded-full overflow-hidden ">
          <Image
          alt=""
          src={session.avaUrl}
          width={30}
          height={30}
          className="w-full h-full object-cover"
          />
          </div>
        </div>
        : 
        <div className="flex mr-auto ml-auto right-0 left-0 w-fit flex-col gap-2 ">
				<UserIcon height={32} width={32} color="black" />
        </div>
				:<div className="text-neutral-600 w-full text-center">{t("please")} <Link href="/login" className="text-blue-400 underline">{t("here")}</Link></div>}
			  </div>
        <div className=" mb-1 h-px bg-gray-300" />
        <ul className="mb-auto pt-1">
          <Links onClickRoute={() => setOpenSidebar(false)} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
