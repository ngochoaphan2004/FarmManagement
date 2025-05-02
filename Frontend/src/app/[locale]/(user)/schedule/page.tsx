"use client"
import 'aos/dist/aos.css';
import Aos from "@/components/aos"
import CustomCalendar from '@/components/FullCalendar/fullCalendar';

export default function Schedule() {
    return (
        <>
            <Aos />
            <section className="w-full min-h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] 
                bg-[size:14px_32px]">
                <div className="pt-24 flex flex-col gap-5 h-full items-center justify-center w-full">
                    <CustomCalendar data-aos="fade-up"/>
                </div>
            </section>
        </>
    )
}