"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
import { DeviceOperation, NotificationOperation } from "@/BE-library/main";
import { useSession } from "@/providers/SessionProvider";
import CustomLoadingElement from "../../loading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import NotificationEditorModal from "../_component/editModal";
// import AreaChartCard from "@/components/Chart/Line";
const AreaChartCard = dynamic(() => import("@/components/Chart/Line"), { ssr: false });

interface Notification {
  frequencyMinutes: number;
  active: boolean;
  title: string;
  description: string | null;
}

interface DataType {
  created_at: Date;
  created_epoch: number;
  expiration: string;
  feed_id: number;
  feed_key: string;
  id: string;
  value: number;
}

interface DeviceType {
  action: string;
  createDate: string;
  deviceName: string;
  id: string;
  qrCode: string;
  status: string;
  type: string;
  updateDate: string;
  speed?: number;
}

function getTopValues(data: DataType[], count: number = 20): number[] {
  if (data !== null) {
    return data.slice(0, count).map(item => item.value);
  }
  return [undefined]
}

const notificationOperation = new NotificationOperation();

function throttleTriggerAction(
  newSpeed: number,
  qrCode: string,
  sessionSid: string,
  throttleTimeout: React.MutableRefObject<NodeJS.Timeout | null>,
  action: DeviceOperation
) {
  if (!throttleTimeout.current) {
    throttleTimeout.current = setTimeout(async () => {
      try {
        await action.triggerAction(qrCode, newSpeed.toString(), sessionSid);
        toast.success(`Tốc độ đã được cập nhật thành ${newSpeed}`);
      } catch (error) {
        toast.error("Lỗi khi cập nhật tốc độ");
        console.error("Error triggering action:", error);
      } finally {
        throttleTimeout.current = null; // Clear the timeout
      }
    }, 500); // 500ms delay
  }
}

function DevicePage({
  params
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [device, setDevice] = useState<DeviceType | null>(null);
  const [data, setData] = useState<DataType[] | null>(null);
  const { session, status } = useSession();
  const action = new DeviceOperation();
  const [editingNotification, setEditingNotification] = useState<Notification>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirm1, setShowConfirm1] = useState(false);

  const closePopup = () => {
    setOpen(false)
  };

  const handleUpdateDevice = async () => {
    if (device && session) {
      console.log("device", device);

      toast.promise(
        action.updateDevice(device.id, device, session.sid),
        {
          loading: 'Đang cập nhật thiết bị...',
          success: () => {
            setEdit(false); // Exit edit mode after successful update
            if (typeof window !== undefined) {
              window.location.reload()
            }
            return 'Cập nhật thiết bị thành công!';
          },
          error: 'Lỗi khi cập nhật thiết bị',
        }
      );
    }
  };

  const handleSaveNotification = async (updatedNotification: Notification) => {
    if (session && device) {
      const notificationWithIds = {
        ...updatedNotification,
        userId: session.id,
        deviceId: device.id,
      };

      if (device && session) {
        toast.promise(
          notificationOperation.createOrUpdate(notificationWithIds, session.sid),
          {
            loading: 'Đang cập nhật...',
            success: async (data) => {
              setEditingNotification(data.data);
              setOpen(false); // Exit edit mode after successful update
              return 'Cập nhật thành công!';
            },
            error: 'Lỗi khi cập nhật',
          }
        );
      }
    }
  };

  const handleDeleteDevice = async () => {
    if (device && session) {
      toast.promise(
        action.delete(device.id, session.sid),
        {
          loading: 'Đang xóa...',
          success: async (data) => {
            router.replace('/en/device')
            return 'Xóa thành công!';
          },
          error: 'Lỗi khi xóa',
        }
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session && params.id[0]) {
        try {
          const result = await action.getData(params.id[0], session.sid);
          setData(result);
        } catch (error) {
          setData(null);
        }

        try {
          const deviceInfo = await action.searchAll(session.sid, { id: params.id[0] });
          const notificationData = await action.searchAll(session.sid, { id: params.id[0] });
          const notificationDetail = await notificationOperation.findOne(session.id, params.id[0], session.sid);

          setDevice(deviceInfo.data[0]);
          setNotifications(notificationData.data);
          setEditingNotification(notificationDetail.data);
          console.log(notificationDetail)
        } catch (error) {
          console.error("Error fetching device data:", error);
        }
      }
    };
    fetchData();
  }, [status, session, params.id[0]]);

  return (
    <>
      <div className="w-screen h-fit md:h-screen overflow-y-scroll md:overflow-hidden">
        {device ?
          <div className="flex gap-10 pt-20 items-center w-full h-full flex-col md:flex-row md:px-10">
            {/* Chart Section */}
            <div className="h-full w-full md:w-1/2 flex flex-col items-center justify-center gap-10">
              <div className="h-1/2 w-full flex flex-col bg-white rounded-lg p-5">
                <div className="text-xl font-bold mb-4">Thông tin thiết bị</div>
                {device && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                    {Object.entries({
                      "Tên": "deviceName",
                      "Loại": "type",
                      "QR code": "qrCode",
                      "Trạng thái": "status",
                      "Ngày tạo": "createDate",
                      "Ngày cập nhật": "updateDate",
                      "Loại hành động": "action",
                    }).map(([label, key]) => (
                      <div key={key} className="flex items-center gap-2">
                        <strong>{label}:</strong>
                        {
                          key === "createDate" || key === "updateDate" || !edit ?
                            (() => {
                              const value = device[key];
                              if (key === "createDate" || key === "updateDate") {
                                const dateValue = typeof value === "string" ? new Date(value) : value;
                                return (
                                  <span>
                                    {dateValue.toLocaleTimeString("vi-VN")} {dateValue.toLocaleDateString("vi-VN")}
                                  </span>
                                );
                              }
                              return <span>{value}</span>;
                            })()
                            :
                            <input
                              type="text"
                              value={device[key]}
                              onChange={(e) =>
                                setDevice((prev) => ({
                                  ...prev,
                                  [key]: e.target.value,
                                }))
                              }
                              className="border rounded px-2 py-1 flex-1"
                            />}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 mt-4 justify-end">
                  <div className="relative inline-block">
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      onClick={() => setShowConfirm(true)}
                    >
                      Xóa
                    </button>

                    {showConfirm && (
                      <div className="absolute z-10 top-full mt-2 right-0 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-sm text-gray-700">
                        <p>Bạn có chắc chắn muốn xóa lịch trình này không?</p>
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            onClick={() => setShowConfirm(false)}
                            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteDevice();
                              setShowConfirm(false);
                            }}
                            className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {!edit ?
                    <>
                      <button
                        onClick={() => setEdit(true)}
                        className="rounded-lg text-green-700 ring-2 ring-green-700 px-4 py-2 active:bg-green-700 active:text-white"
                      >
                        Chỉnh sửa
                      </button>
                    </>
                    :
                    <>
                      <button
                        onClick={handleUpdateDevice}
                        className="rounded-lg text-white bg-green-700 px-4 py-2 active:bg-green-600 active:ring-transparent active:text-white"
                      >
                        Cập nhật
                      </button>
                    </>
                  }
                  <button
                    onClick={() => {
                      setOpen(true)
                    }}
                    className="rounded-lg text-white bg-blue-700 px-4 py-2 active:bg-blue-600 active:ring-transparent active:text-white"
                  >
                    Cài đặt thông báo
                  </button>
                </div>

                {/* Speed Slider */}
                {device.status == "Manual" && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tốc độ thiết bị (0 - 100)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue={getTopValues(data)[0] || 0}
                      onChange={(e) => {
                        const newSpeed = Number(e.target.value);
                        setDevice((prev) => ({
                          ...prev,
                          speed: newSpeed,
                        }));
                      }}
                      onMouseUp={(e) => {
                        if (session && device?.qrCode) {
                          throttleTriggerAction(device.speed ?? getTopValues(data)[0] ?? 0, device.qrCode, session.sid, throttleTimeout, action);
                        }
                      }}
                      onTouchEnd={(e) => {
                        if (session && device?.qrCode) {
                          throttleTriggerAction(device.speed ?? getTopValues(data)[0] ?? 0, device.qrCode, session.sid, throttleTimeout, action);
                        }
                      }}
                      className="w-full"
                    />
                    <div className="text-center mt-2 text-sm text-gray-600">
                      {device.speed ?? getTopValues(data)[0] ?? 0}%
                    </div>
                  </div>
                )}
                {/* Active Switcher */}
                {device.type === "light" && device.status === "Manual Only" && (
                  <div className="mb-4 flex items-center gap-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Active</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={((getTopValues(data)[0] || 0) === 1) ? true : false}
                        onChange={(e) => {
                          const isChecked = e.target.checked;

                          setDevice((prev) => ({
                            ...prev,
                            speed: (isChecked ? 0 : 1)
                          }));
                          if (session && device?.qrCode) {
                            throttleTriggerAction(device.speed ?? getTopValues(data)[0] ?? 0, device.qrCode, session.sid, throttleTimeout, action);
                          }
                        }}
                        className="sr-only peer"
                      />
                      <div
                        className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"
                      ></div>
                      <div
                        className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"
                      ></div>
                    </label>
                  </div>
                )}
              </div>


              {data && <div className="h-1/2 w-full flex flex-col">
                <AreaChartCard
                  data={getTopValues(data).reverse()}
                  categories={data.map(item =>
                    `${new Date(item.created_at).toLocaleDateString("vi-VN")} ${new Date(item.created_at).toLocaleTimeString("vi-VN")}`
                  ).reverse()}
                  label="Lịch sử ghi nhận"
                  color="#10B981"
                />
              </div>}
            </div>

            {/* Table Section */}
            <div className="h-full w-full md:w-1/2 flex flex-col bg-white rounded-lg overflow-hidden">
              <div className="h-16 grid grid-cols-2 text-center text-white items-center p-4 text-lg font-bold bg-green-700">
                <div>Ghi nhận giá trị</div>
                <div>Vào lúc</div>
              </div>
              <div className="flex-1 md:overflow-y-scroll">
                {data?.sort((a, b) => {
                  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                }).map(({ id, feed_key, feed_id, value, expiration, created_at }) => (
                  <div
                    className="grid grid-cols-2 text-center items-center p-4 text-lg font-medium w-full"
                    key={id}
                  >
                    <div>{value}</div>
                    <div className="flex flex-col items-center space-y-1">
                      <span> {new Date(created_at).toLocaleTimeString("vi-VN")} {new Date(created_at).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>
                ))}
                {!data && (
                  <div className="w-full flex justify-center my-6">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 shadow-sm">
                      <span className="text-lg">Không thể kết nối với thiết bị</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          : <CustomLoadingElement />
        }
        {open && (
          <NotificationEditorModal
            notification={editingNotification}
            onClose={closePopup}
            onSave={handleSaveNotification}
          />
        )}
      </div>
    </>
  );
}

export default DevicePage;
