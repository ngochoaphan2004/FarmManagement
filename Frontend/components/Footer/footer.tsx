import React from 'react'
import Link from 'next/link'
import siteMetadata from '@/data/SiteMetaData'
import Image from 'next/image'
import { FaPhone } from "react-icons/fa";
import { useTranslations } from 'next-intl';
export default function Footer() {
  const  t = useTranslations("footer")
  return (
    <footer>
      <div className="relative py-12 md:py-16 bg-green-700">
      <p className="absolute bottom-0 m-auto left-0 right-0 text-white text-lg">{siteMetadata.version}</p>
        <div className="max-w-6xl mx-auto pl-10 pr-10 sm:px-14">

          {/* Top area: Blocks */}
          <div className="grid  md:grid-cols-12 gap-8 lg:gap-20 mb-5 md:mb-12">

            {/* 1st block */}

            <div className="md:col-span-6 lg:col-span-4">
              <div className="-mt-5 flex flex-col gap-4">
                {/* Logo */}
                <Link href="/" aria-label="Cruip">
                  <Image
                    className="bg-white rounded p-5"
                    src={siteMetadata.logo}
                    alt="/"
                    width="1300"
                    height="1000"
                  />
                </Link>
                <ul className="flex items-center md:order-1 mt-5 md:ml-5 md:mb-0">
                  <li>
                    <Link href={"tel: "+siteMetadata.phone} className="flex justify-center items-center text-red-800  hover:text-gray-100 hover:bg-gray-500 rounded-full transition duration-150 ease-in-out"
                      aria-label="Twitter">
                      <Image
                        src="/social/phone.png"
                        alt="/"
                        width="50"
                        height="60"
                        object-fit= "fill"
                      />
                    </Link>
                  </li>
                  <li className="ml-4">
                    <Link href={siteMetadata.facebook} className="flex justify-center items-center text-red-800 bg-primary hover:text-gray-100 hover:bg-gray-500 rounded-full transition duration-150 ease-in-out"
                      aria-label="Facebook">
                      <Image
                        src="/social/facebook.png"
                        alt="/"
                        width="50"
                        height="60"
                        object-fit= "fill"
                      />
                    </Link>
                  </li>
                  <li className="ml-4">
                    <Link href={siteMetadata.zalo} className="flex justify-center items-center text-red-800 bg-primary hover:text-gray-100 hover:bg-gray-500 rounded-full transition duration-150 ease-in-out"
                      aria-label="zalo">
                      <Image
                        src="/social/zalo.png"
                        alt="/"
                        width="50"
                        height="50"
                        object-fit= "fill"
                      />
                    </Link>
                  </li>
                  <li className="ml-4">
                    <Link href={"mailto:" +siteMetadata.mail} className="flex justify-center h-12 w-12 bg-white p-1 items-center text-red-800 rounded-full transition duration-150 ease-in-out"
                      aria-label="mail">
                      <Image
                        src="/social/mail.png"
                        alt="/"
                        width="40"
                        height="40"
                        object-fit= "fill"
                      />
                    </Link>
                  </li>
                  <li className="ml-4">
                    <Link href={siteMetadata.linkedin} className="flex justify-center items-center text-red-800  hover:text-gray-100 hover:bg-gray-500 transition duration-150 ease-in-out"
                      aria-label="linkedIn">
                      <Image
                        src="/social/linkedIn.png"
                        alt="/"
                        width="50"
                        height="50"
                        object-fit= "fill"
                      />
                    </Link>
                  </li>
                </ul>
                <div className="text-white text-justify">
                  {t("ielts")}
                </div>
              </div>
            </div>
            {/*1st, 2nd, 3rd blocks */}
            <div className="md:col-span-6 lg:col-span-8 grid sm:grid-cols-3 gap-8">

              {/* 1nd block */}
              <div className="text-lg col-span-5">
                <h6 className="text-white font-bold uppercase mb-1">
                  {t("address.title")}
                </h6>
                <ul className="list-disc marker:text-white">
                  <li className="mb-2">
                    <div className="hover:text-gray-400 text-gray-100 transition duration-150 ease-in-out">
                    {siteMetadata.address1}
                    </div>
                  </li>
                  <li className="mb-2">
                    <div  className="hover:text-gray-400 text-gray-100 transition duration-150 ease-in-out">
                    {siteMetadata.address2}
                    </div>
                  </li>
                </ul>
              </div>
              {/* 2nd block */}
              <div className="text-lg col-span-3">
                <h6 className="text-white font-bold uppercase mb-1">
                  {t("working_hours.title")}
                </h6>
                <ul className="list-disc marker:text-white">
                  <li className="mb-1">
                    <div className="hover:stext-gray-400 text-gray-100 transition duration-150 ease-in-out">
                    {t("working_hours.weekdays")}
                    </div>
                  </li>
                  <li className="mb-1">
                    <div className="hover:stext-gray-400 text-gray-100 transition duration-150 ease-in-out">
                      {t("working_hours.weekend")}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}
