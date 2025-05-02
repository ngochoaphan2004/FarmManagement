"use client";
import { CredentialsForm } from "@/components/LogPages/CredentialsForm";
import { GoogleSignInButton } from "@/components/LogPages/GoogleSignInButton";
import Image from "next/image";
import { useState } from "react";
import { AccountOperation } from "@/BE-library/main";
import Cookies from "js-cookie"
import { useTranslations } from "next-intl";
export default function Log() {
    const t =useTranslations("LogPage")
	return (
        <div className="bg-primary fixed z-50 inset-0">
        <div className={`relative  duration-500 w-full flex flex-col py-5  px-10 items-center justify-center h-screen`}>
            <div className="hidden lg:block lg:w-[calc(450px)] bg-green-800 h-[calc(100%)] md:h-[calc(90%)] lg:max-h-[calc(800px)] absolute transition-all transform
            rounded-xl rotate-12 animate-rotate-in-12deg"></div>
            <div className="hidden lg:block lg:w-[calc(450px)] bg-green-500  h-[calc(100%)] md:h-[calc(90%)] lg:max-h-[calc(800px)] absolute transition-all transform
            rounded-xl rotate-6 animate-rotate-in-6deg"></div>
            <div className="absolute bg-white rounded-xl flex 
                flex-col items-center flex-center
                px-10 pt-5 md:px-20 md:pb-10 shadow-md h-[calc(100%)] lg:h-[calc(90%)] lg:max-h-[calc(800px)]">
                <Image src="/photos/logobachkhoa.png" 
                className="mb-5"
                alt="Google Logo" width={300} height={300} />
                <span className="text-xl font-semibold  text-center mb-10 w-72">Hi, welcome to the smart farm system!</span>
                <GoogleSignInButton/>
                {/* <div className="relative h-3/6 w-full">
                    <CredentialsForm/>
                </div>  */}
            </div>
        </div>
        </div>
	);
}
