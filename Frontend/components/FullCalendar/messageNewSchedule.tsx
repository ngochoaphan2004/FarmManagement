'use client';

import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'error' | 'success';
  messages: string[];
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ isOpen, onClose, type, messages }) => {
  const isError = type === 'error';

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} as="div" className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`bg-white p-6 rounded-xl w-full max-w-md shadow-xl ${
                isError ? 'border-red-300' : 'border-green-300'
              }`}
            >
              <Dialog.Title className="text-xl font-semibold mb-3 text-center">
                {isError ? '❌ Lỗi' : '✅ Thành công'}
              </Dialog.Title>

              <div className={`mb-4 text-sm ${isError ? 'text-red-700' : 'text-green-700'}`}>
                <ul className="list-disc list-inside space-y-1">
                  {messages.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <button
                  onClick={onClose}
                  className={`px-4 py-2 rounded-md ${
                    isError
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  Đóng
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default FeedbackDialog;
