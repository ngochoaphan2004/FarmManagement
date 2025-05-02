'use client';

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { EventClickArg } from '@fullcalendar/core';

import { useSession } from '@/providers/SessionProvider';
import generateScheduleEvents from './formatFunc';
import { listenerCount } from 'process';
import { DeviceOperation, UserOperation } from '@/BE-library/main';
import { ScheduleOperation } from '@/BE-library/main';
import CreateEntityModal from './createNewSchedule';
import FeedbackDialog from './messageNewSchedule';

const StyleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  min-height: calc(100vh - 7.5rem);

  .fc {
    width: 100%;
    max-width: 1000px;
    background: #ffffff;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    font-family: 'Inter', sans-serif;
    color: #333;
    overflow-x: auto;
  }

  .fc-toolbar {
    flex-wrap: wrap;
    gap: 0.5rem;

    .fc-toolbar-title {
      font-size: 1rem;
      font-weight: 600;
    }

    .fc-button {
      background: #3b82f6;
      border: none;
      color: white;
      padding: 0.4rem 0.75rem;
      border-radius: 0.5rem;
      margin: 0 0.25rem;
      transition: background 0.3s;

      &:hover {
        background: #2563eb;
      }

      &:disabled {
        background: #9ca3af;
      }
    }
  }

  .fc-daygrid-day {
    border: 1px solid #e5e7eb;
    overflow: hidden;
  }

  .fc-daygrid-event {
    padding: 0;
  }

  .fc-scrollgrid {
    border-radius: 0.75rem;
    overflow: hidden;
  }

  /* Mobile adjustments */
  @media (max-width: 640px) {
    .fc-toolbar-title {
      font-size: 1rem;
    }

    .fc-button {
      font-size: 0.75rem;
      padding: 0.3rem 0.5rem;
    }

    .fc-daygrid-event {
      font-size: 0.65rem;
    }

    .fc {
      padding: 0.5rem;
    }
  }
`;


export default function CustomCalendar() {
  const action = new ScheduleOperation()
  const userAction = new UserOperation()
  const deviceAction = new DeviceOperation()
  const { session, status } = useSession()

  const [initialView, setInitialView] = useState<null | 'dayGridMonth' | 'listWeek'>(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [listEvents, setListEvents] = useState([])
  const [listDevices, setListDevices] = useState([])

  const [changed, setChanged] = useState(false);
  const [formData, setFormData] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirm1, setShowConfirm1] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const [userId, setuserId] = useState('');


  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'error' | 'success'>('success');
  const [dialogMessages, setDialogMessages] = useState<string[]>([]);



  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      setInitialView(isMobile ? "listWeek" : "dayGridMonth");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // get userID
      const user = await userAction.searchByAuthen(session.sid)
      setuserId(user.data.id);
      // get list devices
      const devices = await deviceAction.searchAll(session.sid, {})
      setListDevices(devices.data);

      // get events and format its
      const res = await action.searchAll(session.sid, {
        userId: user.data.id
      })

      let formated_res = []
      for (const temp of res.data) {
        let index = Math.random()
        formated_res.push(...generateScheduleEvents(temp, index, 10))
      }

      setListEvents(formated_res)
    };

    if (session && status == "authenticated")
      fetchData();
  }, [status]);

  useEffect(() => {
    setChanged(false)
    setFormData({
      title: selectedEvent?.title ?? '',
      deviceName: selectedEvent?.data?.device?.deviceName ?? '',
      action: selectedEvent?.data?.action ?? '',
      actionTime: selectedEvent?.data?.actionTime ?? '',
      condition: selectedEvent?.data?.conditon ?? '',
      repeat: selectedEvent?.data?.repeat ?? '',
      time: selectedEvent?.data?.time ?? '',
      data: selectedEvent?.data ?? ""
    })
  }, [selectedEvent]);

  if (!initialView) return null;

  const handleEventClick = (info: EventClickArg) => {
    setSelectedEvent({
      title: info.event.title,
      data: info.event.extendedProps.data
    });
  };

  function closeModal() {
    setSelectedEvent(null)
  };

  const deleteSchedule = async () => {
    await action.delete(selectedEvent.data.id, session.sid)
    
      if (typeof window !== "undefined") {
        window.location.reload();
      }
  };

  const updateSchedule = async () => {
    await action.updateSchedule(selectedEvent.data.id,
      {
        action: formData.action,
        actionTime: formData.actionTime,
        conditon: formData.condition,
        repeat: formData.repeat,
        time: formData.time
      }
      , session.sid)
    
      if (typeof window !== "undefined") {
        window.location.reload();
      }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className='w-full'
        >
          <StyleWrapper className="w-full">
            <FullCalendar
              plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
              initialView={initialView}
              locale={"en"}
              eventContent={renderEventContent}
              // dateClick={() => setModalOpen(true)}
              eventClick={handleEventClick}
              events={session ? listEvents : []}
            />
          </StyleWrapper>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className='w-full'
        >
          <button
            onClick={() => setModalOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-3xl font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
            title="Thêm mới"
          >
            +
          </button>
        </motion.div>
      </AnimatePresence>


      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <Dialog
            open={!!selectedEvent}
            onClose={closeModal}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center p-4"
            >
              <Dialog.Panel className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-lg font-bold mb-2">Thông tin lịch trình</Dialog.Title>
                <div className="space-y-4 text-sm text-gray-700">
                  {/* Tiêu đề */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                    <input
                      type="text"
                      disabled
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        setChanged(true);
                      }}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  {/* Tên thiết bị */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên thiết bị</label>
                    <input
                      type="text"
                      disabled
                      value={formData.deviceName}
                      onChange={(e) => {
                        setFormData({ ...formData, deviceName: e.target.value });
                        setChanged(true);
                      }}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div className='flex gap-2'>
                    {/* Hành động */}
                    <div className='flex-1'>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hành động</label>
                      <input
                        type="text"
                        value={formData.action}
                        onChange={(e) => {
                          setFormData({ ...formData, action: e.target.value });
                          setChanged(true);
                        }}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>

                    {/* Thời gian hành động */}
                    <div className='flex-1'>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian hoạt động (giây)</label>
                      <input
                        type="number"
                        value={formData.actionTime}
                        onChange={(e) => {
                          setFormData({ ...formData, actionTime: Number(e.target.value) });
                          setChanged(true);
                        }}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>

                  {/* Điều kiện */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Điều kiện</label>
                    <input
                      type="text"
                      value={formData.condition}
                      onChange={(e) => {
                        setFormData({ ...formData, condition: e.target.value });
                        setChanged(true);
                      }}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  {/* Chu trình lặp */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chu trình lặp</label>
                    <input
                      type="text"
                      value={formData.repeat}
                      onChange={(e) => {
                        setFormData({ ...formData, repeat: e.target.value });
                        setChanged(true);
                      }}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  {/* Giờ đặt lịch */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giờ đặt lịch</label>
                    <input
                      type="text"
                      value={formData.time}
                      onChange={(e) => {
                        setFormData({ ...formData, time: e.target.value });
                        setChanged(true);
                      }}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>

                <div className="mt-4 justify-end flex gap-3">
                  {changed && (
                    <div className="relative inline-block">
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        onClick={() => setShowConfirm1(true)}
                      >
                        Cập nhập
                      </button>

                      {showConfirm1 && (
                        <div className="absolute z-10 bottom-full mb-2 right-0 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-sm text-gray-700">
                          <p>Bạn có chắc chắn muốn cập nhập lịch trình này không?</p>
                          <div className="flex justify-end gap-2 mt-4">
                            <button
                              onClick={() => setShowConfirm1(false)}
                              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={() => {
                                updateSchedule();
                                setShowConfirm1(false);
                              }}
                              className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
                            >
                              Cập nhập
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}


                  <div className="relative inline-block">
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      onClick={() => setShowConfirm(true)}
                    >
                      Xóa
                    </button>

                    {showConfirm && (
                      <div className="absolute z-10 bottom-full mb-2 right-0 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-sm text-gray-700">
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
                              deleteSchedule();
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

                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={closeModal}
                  >
                    Đóng
                  </button>
                </div>
              </Dialog.Panel>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence >


      <CreateEntityModal
        userId={userId}
        listDevice={listDevices}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => {
          const postPayload = async (temp) => {
            try {
              
              const res = await action.create(temp, session.sid)
              console.log("res",res);
              if (res.status === 201) {
                setDialogType('success');
                setDialogMessages(['Tạo thành công!']);
                setDialogOpen(true);
                setModalOpen(false)
                return true // van hien thi dialog
              } else {
                setDialogType('error');
                const msgs = Array.isArray(res.success.message) ? res.success.message : [res.success.message || 'Đã xảy ra lỗi.'];
                setDialogMessages(msgs);
                setDialogOpen(true);
                return false // tat dialog
              }
            } catch (error) {
              setDialogMessages(["Lỗi kết nối đến máy chủ."]);
              return false // tat dialog
            }
          }
          return postPayload(data)
        }}
      />

      <FeedbackDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type={dialogType}
        messages={dialogMessages}
      />
    </>
  );
};

function renderEventContent(eventInfo) {
  const start = eventInfo.event.start;
  const title = eventInfo.event.title;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const startTime = start ? formatTime(start) : '';

  return (
    <div className={`flex gap-[2px] text-white px-[6px] py-[2px] rounded text-xs mb-[2px] ${eventInfo.event.backgroundColor ?? 'bg-slate-500 hover:bg-slate-700'}`}>
      <b>{startTime}</b>
      <span>{title}</span>
    </div>
  );
}
