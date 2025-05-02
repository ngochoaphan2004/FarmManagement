"use client";
import Image from "next/image";
import Aos from "@/components/aos";
import 'aos/dist/aos.css'
import { useEffect, useRef, useState } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useSession } from "@/providers/SessionProvider";
import { UpdateAccountPayload } from "@/BE-library/interfaces";
import { DeviceOperation, UserOperation } from "@/BE-library/main";
import PrinterList from "./_view/printerList";
import UploadFile from "./_view/uploadFile";
import { useRouter } from "next/navigation";
import QrScanner from "@/components/QrScan/QrScan";

export default function Print() {
	const { session, status } = useSession();
	const router = useRouter();
	const [files, setFiles] = useState([]);
	const fileInputRef = useRef(null);
	const [view, setView] = useState<"device" | "uploadFile">("device");
	const action = new DeviceOperation();
	const userAction = new UserOperation();
	const [usrId, setusrId] = useState('')

	useEffect(() => {
		if (!session?.sid) return;

		const fetchD = async () => {
			try {
				const user = await userAction.searchByAuthen(session.sid);
				setusrId(user.data.id);
			} catch (error) {
				console.error("User fetch error:", error?.response?.data || error.message);
			}
		};
		fetchD();
	}, [session]);


	return (
		<>
			<Aos />
			<div className="w-screen flex justify-center">
				<div className="absolute z-10 w-screen px-20 flex items-center h-screen bg-green-700">
					<Image src="/photos/Vector13.png" alt="Bg" width={9999} height={9999}
						className="absolute bottom-0 left-0"
					/>
					<Image src="/photos/Vector14.png" alt="Bg" width={9999} height={9999}
						className="absolute bottom-0 left-0"
					/>
				</div>
				{view == "device" && <PrinterList userID={usrId} setView={setView} />}
			</div>
		</>

	);
}
