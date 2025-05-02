"use client"
import React, { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { motion, Variants } from "framer-motion";
import DashIcon from "@/components/Icon/DashIcon";
import { useUserContext } from "@/providers/LoggedInProvider";
import { FaChartPie, FaRegNewspaper, FaRegWindowRestore } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { useSession } from "@/providers/SessionProvider";
import { IoHomeSharp, IoLibrary } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { LogOutIcon } from "lucide-react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
type Props = {
  onClickRoute?: (e: MouseEvent<HTMLElement>) => any | any
}

const linkVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
};

export function SidebarLinks({ onClickRoute }: Props) {
  const pathname = usePathname();
  const {session, status} =useSession()
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const t = useTranslations("navigation")
  const t2 =useTranslations("stat_bar")
  const router = useRouter()
  const routes = [
    {
      name: t("home"),
      path: "/",
      icon: <IoHomeSharp className="h-5 w-5 ml-0.5" />,
      type:"home",
      
    },
    {
      name: t("online_test"),
      path: "/device",
      icon: <IoLibrary className="h-6 w-6" />,
      type:"online_test",
    },
    {
      name: t("notes"),
      path: "/schedule",
      icon: <FaRegWindowRestore className="h-5 w-5 ml-0.5" />,
      type:"notes",
    }
  ];
  const Protectedroutes = [
    {
      name: t2("profile"),
      path: "/profile",
      icon: <CgProfile className="h-5 w-5 ml-0.5" />,
      type:"home",  
    },
    {
      name: t2("logout"),
      path: "#",
      icon: <LogOutIcon className="h-6 w-6" />,
      type:"logout",
    },
  ];
  useEffect(() => {
    const findActiveRouteIndex = () => {
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if (route.path && route.path && pathname.includes(route.path)) {
          return i;
        }
      }
      return null;
    };
    setActiveIndex(findActiveRouteIndex());
  }, [pathname]);
  useEffect(() => {
   console.log(activeIndex)
  }, [pathname]);
  const handleOut =()=>{
		Cookies.remove("gid", { path: '', domain: '.engonow.com' })
		Cookies.remove('sid', { path: '/', domain: '.engonow.com' })
		Cookies.remove('refresh_token', { path: '/', domain: '.engonow.com' })
		Cookies.remove('uid', { path: '/', domain: 'study.engonow.com' })
		location.reload()
		router.push("/")
		
	}
  const handleRouteClick = (index: number, e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    setActiveIndex(index);
    if (onClickRoute) {
      onClickRoute(e);
    }
  };
  return (
    <>
      <div className="mb-4">
        <p className={`${activeIndex != null && activeIndex < routes.length ? "" : "text-gray-600"} font-semibold mb-2 pl-5`}>
         {t2("nav")}
        </p>
        {routes.map((route: any, index: number) => 
        {
          return (
          <Link key={`tool-${index}`} href={route.path} onClick={(e) => 
          { 
            if(route.type === "logout")
              handleOut()
            else
            handleRouteClick(index, e)
          }
          }>
            <motion.div
              variants={linkVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.3, delay: 0.5 * index }}
              className="relative mb-3 flex hover:cursor-pointer"
            >
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
              >
                <span
                  className={`${activeIndex === index
                    ? "font-bold text-red-500"
                    : "font-medium text-gray-600"
                    }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${activeIndex === index
                    ? "font-medium text-red-500"
                    : "font-medium text-gray-600"
                    }`}
                >
                  {route.name}
                </p>
              </li>
              {activeIndex === index && (
                <motion.div
                  className="absolute right-0 -top-0.5 h-9 w-1 rounded-lg bg-red-500"
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 * index }}
                />
              )}
            </motion.div>
          </Link>
        )})}
      </div>
      {status === "authenticated" && 
      <div>
        <p className={`${activeIndex != null && activeIndex >= Protectedroutes.length ? "" : "text-gray-600"} font-semibold mb-2 pl-5 pt-2`}>
          {t2("user")}
        </p>
        {Protectedroutes.map((route: any, index: number) => {
          const managementIndex = index + Protectedroutes.length;
          return (
            <Link key={`management-${index}`} href={route.path} 
            onClick={(e) => {
              { 
                if(route.type === "logout")
                  handleOut()
                else
                handleRouteClick(index, e)
              }
              }}>
              <motion.div
                variants={linkVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.3, delay: 0.5 * (managementIndex) }}
                className="relative mb-3 flex hover:cursor-pointer active:bg-red-500"
              >
                <li
                  className="my-[3px] flex cursor-pointer items-center px-8"
                >
                  <span
                    className={`${activeIndex === managementIndex
                      ? "font-medium text-red-500"
                      : "font-medium text-gray-600"
                      }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}{" "}
                  </span>
                  <p
                    className={`leading-1 ml-4 flex ${activeIndex === managementIndex
                      ? "font-medium text-red-500"
                      : "font-medium text-gray-600"
                      }`}
                  >
                    {route.name}
                  </p>
                </li>
                {activeIndex === managementIndex && (
                  <motion.div
                    className="absolute right-0 -top-0.5 h-9 w-1 rounded-lg bg-red-500"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 * (managementIndex) }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>}
    </>
  );
}

export default SidebarLinks;
