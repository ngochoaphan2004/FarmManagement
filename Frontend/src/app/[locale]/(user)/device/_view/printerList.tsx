"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "@/providers/SessionProvider";
import CustomLoadingElement from "../../loading";
import { useTranslations } from "next-intl";
import { DeviceOperation } from "@/BE-library/main";
import { IoWarning } from "react-icons/io5";
import { useRouter } from "next/navigation";
import AddDeviceModal from "../_component/addModal"; // Import AddDeviceModal
import { toast } from "sonner";

function getStatusClass(status) {
    switch (status) {
        case 'active':
            return 'text-green-500';
        case 'inactive':
            return 'text-red-500';
        case 'occupied':
            return 'text-yellow-500'; // Add a color for occupied status
        case 'deleted':
            return 'text-gray-500'; // Add a color for deleted status
        default:
            return ''; // Or a default class if needed
    }
}
interface Props {
    userID: string,
    setView: Dispatch<SetStateAction<"device" | "uploadFile">>;
}
export default function PrinterList({ userID, setView }: Props) {
    const { session, status } = useSession()
    const [ListPayment, setListPayment] = useState(null)
    const [showAddModal, setShowAddModal] = useState(false); // State to control AddDeviceModal visibility
    const t = useTranslations("profile")
    const action = new DeviceOperation()
    const router = useRouter()

    const handleAddDevice = async (newDevice) => {
        if (session) {
            toast.promise(
                action.create(newDevice, session.sid),
                {
                    loading: "Đang thêm thiết bị...",
                    success: async (response) => {
                        console.log(response)
                        setShowAddModal(false); // Close the modal after saving
                        setTimeout(() => {

                            if (typeof window !== "undefined") {
                                window.location.reload();
                            }
                        }, 500); // 500ms delay
                        return "Thêm thiết bị thành công!";
                    },
                    error: "Lỗi khi thêm thiết bị",
                }
            );
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            // const res = await action.searchStudentByID(session.id, session.sid)
            const res = await action.searchAll(session.sid, {})
            console.log(res)
            setListPayment(res.data)
        };
        if (session && status == "authenticated")
            fetchData();
        console.log(status)
    }, [status]);
    return (
        <>
            <div className="flex z-20 w-full gap-10 container mx-auto mt-[100px] max-w-fit md:max-w-[80vw]">
                {status === "authenticated" && session ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {ListPayment?.map(({
                            action,
                            createDate,
                            deviceName,
                            id,
                            qrCode,
                            status,
                            type,
                            updateDate,
                        }) => (
                            <div
                                className="flex justify-between bg-white items-center
                            text-lg cursor-pointer font-medium w-full h-72 px-10 rounded-lg shadow-md hover:scale-105 duration-150 ease-in"
                                key={id}
                                onClick={
                                    () => {
                                        router.push(`/device/${id}`)
                                    }
                                }
                            >
                                <div className="flex flex-col gap-10 items-center">
                                    <Image
                                        src={type ? `/photos/${type}.png` : "/photos/Printer.png"}
                                        alt="device"
                                        className="block"
                                        width={100}
                                        height={100} />
                                    <div className="flex flex-col items-start">
                                        <div className="font-bold text-xl">{deviceName} - {type} <span className={`${getStatusClass(status)}`}>{status}</span></div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    : <CustomLoadingElement />
                }
            </div>

            {/* Add Device Modal */}
            {showAddModal && (
                <AddDeviceModal
                    userID={userID}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddDevice}
                />
            )}

            {/* Floating Add Button */}
            <button
                onClick={() => setShowAddModal(true)}
                className="z-30 fixed bottom-10 right-10 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-600"
            >
                +
            </button>
        </>
    );
}
