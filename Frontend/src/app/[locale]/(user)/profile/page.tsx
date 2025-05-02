"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "@/providers/SessionProvider";
import CustomLoadingElement from "../../loading";
import { useTranslations } from "next-intl";
import { DeviceOperation } from "@/BE-library/main";
import moment from "moment";
import 'moment/locale/vi'; // Add this import to use Vietnamese locale
import { TabSlider } from "@/components/SliderTab/TabSlider";
import TrafficPieChart from "@/components/Chart/Pie";
import EnvironmentTable from "./Enviroment";

function getStatusClass(status) {
	switch (status) {
	  case 'in progress':
		return 'text-yellow-500';
	  case 'successful':
		return 'text-green-500';
	  case 'failed':
		return 'text-red-500';
	  default:
		return ''; // Hoặc một lớp mặc định nếu cần
	}
}

export default function Profile() {
	const filterData = [
		{ id: 0, name: "Tổng quan nông trại", value: "PaymentHistory" },
		{ id: 1, name: "Các thiết bị", value: "PrintHistory" },
	];
	const [filter, setFilter] = useState<"PaymentHistory" | "PrintHistory">("PaymentHistory");
	const { session, status } = useSession();
	const [chartData, setChartData] = useState<{ series: number[]; labels: string[]; colors: string[] } | null>(null);
	const t = useTranslations("profile");
	const deviceAction = new DeviceOperation();

	useEffect(() => {
		const fetchChartData = async () => {
			if (status === "authenticated" && session) {
				try {
					const data = await deviceAction.getFirstDataPointsForUser(session.id, session.sid);
					const series = data.map((item) => Number(item.value) || 0); // Ensure values are numbers
					const labels = data.map((item) => item.label || `Label ${item.id}`);
					const colors = data.map((_, index) => {
						const h = (index * 360) / data.length;
						const s = 70;
						const l = 50;

						// Convert HSL to HEX
						const hslToHex = (h: number, s: number, l: number) => {
							l /= 100;
							const a = (s * Math.min(l, 1 - l)) / 100;
							const f = (n: number) => {
								const k = (n + h / 30) % 12;
								const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
								return Math.round(255 * color)
									.toString(16)
									.padStart(2, "0"); // Convert to HEX
							};
							return `#${f(0)}${f(8)}${f(4)}`;
						};

						return hslToHex(h, s, l);
					});

					console.log("Chart Data:", { series, labels, colors }); // Debugging log
					setChartData({ series, labels, colors });
				} catch (error) {
					console.error("Error fetching chart data:", error);
				}
			}
		};
		fetchChartData();
	}, [status, session]);

	return (
		<>
			{status === "authenticated" && session ? (
				<div className="px-10 md:px-20 flex justify-center">
					<div className="bg-white mt-32 animate-slide_in_up rounded-3xl justify-center w-full flex flex-col shadow-xl">
						<div className="flex gap-5 items-center justify-between bg-blue-500 p-10 md:p-20 rounded-tr-3xl rounded-tl-3xl w-full flex-col md:flex-row">
							<div className="w-fit gap-5 items-center justify-center flex flex-col md:flex-row">
								<div className="h-fit animate-pop flex flex-col items-center justify-center">
									{!session.avaUrl && (
										<div className="relative flex w-32 h-32 hover:cursor-pointer rounded-full overflow-hidden transition-all duration-500 cursor-pointer">
											<Image
												width={100}
												height={100}
												className="w-full h-full object-cover"
												alt="avatar"
												src={"/photos/SunGlass.jpg"}
											/>
										</div>
									)}
									{session.avaUrl && session && (
										<div className="relative flex w-32 h-32 hover:cursor-pointer rounded-full overflow-hidden transition-all duration-300 cursor-pointer">
											<Image
												alt="avatar"
												src={session.avaUrl}
												width={100}
												height={100}
												className="w-full h-full object-cover"
											/>
										</div>
									)}
								</div>
								<div className="w-fit">
									{session != null ? (
										<div className="flex text-white flex-col w-fit">
											<div className="w-full break-all font-extrabold text-3xl">
												{session && session.fullName ? session.fullName : "Không có thông tin!"}
											</div>
											<div className="w-full break-all">
												{session && session.email ? session.email : "Tài khoản của bạn không sử dụng email!"}
											</div>
										</div>
									) : (
										<>{t("no_user")}</>
									)}
								</div>
							</div>
							<div className="w-fit text-white animate-pop">
								Nông trại của bạn đã được tạo:<br />
								<span className="text-2xl">
									{session
										? `${moment(session.createdAt).locale('vi').fromNow()} (${moment(session.createdAt).format("DD/MM/YYYY HH:mm:ss")})`
										: t("no_info")}
								</span>
							</div>
						</div>

						<div className="">
							<div className="w-full h-full flex flex-col md:flex-row">
								{chartData && (
									<TrafficPieChart
										series={chartData.series}
										labels={chartData.labels}
										colors={chartData.colors}
										title="Tổng quan chỉ số nông trại"
									/>
								)}
								<EnvironmentTable/>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="h-screen w-screen">
					<CustomLoadingElement />
				</div>
			)}
		</>
	);
}
