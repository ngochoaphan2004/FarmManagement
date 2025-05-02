"use client"
import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
  FiGlobe
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import React from 'react';
import { useLocale } from "next-intl";
import {useParams} from 'next/navigation';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import {useRouter, usePathname} from '../../src/navigation';
import {Locale} from '../../src/types';
import cookies from "js-cookie"
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Cookies from "js-cookie"
interface Props {
  IconColor: string;
}
function getLang() {
  return cookies.get("NEXT_LOCALE")
}
const LangSelector: React.FC<Props>  = ({IconColor}) => {
  const Name2CountryCode: { [key: string]: string } = {
    "English": "en",
    "Tiếng Việt": "vi",
  };
  const [open, setOpen] = useState(false);
  const currLocale = useLocale()
  const currPath = usePathname()
  const locale: string = currLocale === "en" ? "English" : "Tiếng Việt"
  const [display, setDisplay]= useState<string>(locale)
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  function onSelectChange(code: string) {
    const nextLocale = code
    document.documentElement.lang = Name2CountryCode[nextLocale];
    startTransition(() => {
      
      router.replace(
        {
          pathname,
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          params
        },
        {locale: Name2CountryCode[nextLocale]}
      );
    });
    // location.reload()
  }
  // useEffect(() => {
  //   console.log(pathname)
  // }, [pathname]);
  const langRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langRef.current &&
        event.target &&
        (event.target as HTMLElement).id !== "langRefButton"
      ) {
        setOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langRef]);
  return (
      <motion.div animate={open ? "open" : "closed"} className="relative z-10">
        <div
          id="langRefButton" ref={langRef} onClick={() => setOpen((pv) => !pv)}
          className="flex items-center active:scale-110 duration-300 z-50 !cursor-pointer gap-4 rounded-lg text-indigo-50"
        >
          <div id="langRefButton" className="absolute z-40 bg-transparent w-full h-full"></div>
            <div className="w-10 text-neutral-600 text-sm md:text-xl">
              {currLocale=="en"? 
              <Image
              alt="united-kingdom flag"
              src="/photos/united-kingdom.png"
              width={30}
              height={30}
              /> :
              <Image
              alt="Việt nam flag"
              src="/photos/vietnam.png"
              width={30}
              height={30}
              />
            }
            </div>
        </div>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}  
          transition={{ duration: 0.1 }}
          className="flex flex-col gap-2 p-1 px-2 z-50 rounded-lg bg-white shadow-xl absolute top-[130%] left-[50%] w-fit overflow-hidden"
        >
          <Option handle={onSelectChange} Icon={FiEdit} text="English" />
          <Option handle={onSelectChange} Icon={FiPlusSquare} text="Tiếng Việt" />
        </motion.ul>
      </motion.div>
  );
};

const Option = ({ text, Icon, handle }) => {
  return (
    <motion.li
      variants={itemVariants}
      transition={{ duration: 0.1 }}
      onClick={() => { handle(text) }}
      className="flex z-50 items-center gap-2 w-full px-2 py-2 text-xs font-medium whitespace-nowrap rounded-lg hover:bg-indigo-100 text-slate-700 hover:text-slate-500 transition-colors cursor-pointer"
    >
      <span>{text}</span>
    </motion.li>
  );
};

export default LangSelector;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};