"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { useSidebarContext } from "@/providers/SidebarProvider";
import { useSearchContext } from "@/providers/SearchProvider";
import { useUserContext } from "@/providers/LoggedInProvider";
import DropDown from "./DropDown";
import { useSession } from "@/providers/SessionProvider";
import LocaleSwitcher from "../LangLink/LocaleSwitcher";
import LangSelector from "../LangLink/LangSelector";
import { useTranslations } from "next-intl";
import Sidebar from "../Sidebar";

export const FloatingNav = ({
  className,
}: {
  className?: string;
}) => {
  const router = useRouter();
  const t = useTranslations("navigation")
  const t2 = useTranslations("home")
  const { scrollYProgress } = useScroll();
  const navItems = [
    { name: t("home"), link: "/" },
    { name: t("online_test"), link: "/device" },
    { name: t("notes"), link: "/schedule" },
  ];
  const { searchTitle, setSearchTitle } = useSearchContext();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openSidebar, setOpenSidebar } = useSidebarContext()
  const pathname = usePathname()
  const {session, status} =useSession()
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    typeof window !== "undefined" && document.addEventListener("mousedown", handleClickOutside);
    return () => {
      typeof window !== "undefined" && document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handledocumentClick = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      } else setIsSearchFocused(true);
    };

    typeof window !== "undefined" && document.addEventListener("mousedown", handledocumentClick);

    return () => {
      typeof window !== "undefined" && document.removeEventListener("mousedown", handledocumentClick);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? -20 : -20,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex z-50 px-5 max-w-fit min-w-[90vw] md:min-w-[60vw] fixed top-10 inset-x-0 mx-auto md:px-10 py-2 rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-between space-x-4",
          className
        )}
      >
        <div className="relative w-full h-full flex justify-center items-center">
          <div className="absolute z-[51] w-10 h-10 md:hidden left-4 flex justify-center place-items-center border-r-2 pr-2 border-gray-300/30">
            <span
              className="flex cursor-pointer text-xl text-gray-400"
              onClick={() => setOpenSidebar(true)}
            >
              <FiAlignJustify className="h-6 w-6" />
            </span>
          </div>
          <div className="h-10 flex items-center md:w-60">
            <Image src="/photos/logobachkhoa.png" 
            className="object-cover" alt="Your image"
            height={60} width={60}/>
            <span className="font-bold text-green-800">SmartFarm</span>
          </div>
          <div className="hidden md:flex items-center justify-center space-x-8 w-full border-gray-300/30 h-10">
            {navItems.map((navItem, idx) => (
              <div key={`link=${idx}`} className="relative group">
                { <Link
                  href={navItem.link}
                  className={cn(
                    "relative items-center flex space-x-1 text-neutral-600 hover:text-neutral-500"
                  )}
                >
                  <span className="text-sm !cursor-pointer hover:text-red-500">{navItem.name}</span>
                </Link>}
              </div>
            ))}
          </div>
          <div className="max-md:absolute max-md:top-1 max-md:right-0">
          <LangSelector IconColor={"black"}/>
          </div>
          
          {status =="authenticated" ? <DropDown/> :
          <Link 
          className="hover:bg-gray-100 text-neutral-600 w-36 text-center hidden lg:block"
          href="/login"
          >
            {t2(`login`)}
          </Link>}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
