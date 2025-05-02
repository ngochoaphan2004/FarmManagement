'use client';

import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface CreateEntityModalProps {
  userId: string;
  listDevice: any[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<boolean>;
}

export default function CreateEntityModal({ userId, listDevice, isOpen, onClose, onSubmit }: CreateEntityModalProps) {
  const [formData, setFormData] = useState({
    deviceId: '',
    action: '',
    actionTime: undefined,
    conditon: 'null',
    repeat: '',
    time: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const run = async () =>{
      const payload = {
        ...formData,
        userId: userId,
        actionTime: formData.actionTime ? Number(formData.actionTime) : undefined,
      };
      let boo = await onSubmit(payload)
      if (boo) {
        onClose();
  
        setFormData({
          deviceId: '',
          action: '',
          actionTime: undefined,
          conditon: 'null',
          repeat: '',
          time: '',
        })
  
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }
    }
    run()
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-6 rounded-xl w-full max-w-xl shadow-xl"
            >
              <Dialog.Title className="text-xl font-semibold mb-4">Tạo mới</Dialog.Title>


              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Device</label>
                <select
                  name="deviceId"
                  value={formData.deviceId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">-- Chọn thiết bị --</option>
                  {listDevice
                    .filter((di) => ['trigger'].includes(di.action))
                    .map((device) => (
                      <option key={device.id} value={device.id}>
                        {device.deviceName}
                      </option>
                    ))}
                </select>
              </div>


              <div className="mb-3 flex gap-2">
                <div className='flex-1'>
                  <label className="block text-sm font-medium mb-1">Action</label>
                  <input
                    type="text"
                    name="action"
                    value={formData.action}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className='flex-1'>
                  <label className="block text-sm font-medium mb-1">Action Time</label>
                  <input
                    type="number"
                    name="actionTime"
                    value={formData.actionTime ?? ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              {/* <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Condition</label>
                <input
                  type="text"
                  name="conditon"
                  value={formData.conditon}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div> */}

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Repeat</label>
                <input
                  type="text"
                  name="repeat"
                  value={formData.repeat}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>


              <div className="flex justify-end mt-4 gap-2">
                <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Hủy</button>
                <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Tạo</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
