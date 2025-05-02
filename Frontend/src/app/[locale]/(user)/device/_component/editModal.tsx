"use client";

import React, { useState } from "react";
import { NotificationOperation } from "@/BE-library/main"; // Adjust the import path as needed

const notificationOperation = new NotificationOperation();

interface Notification {
  frequencyMinutes: number;
  active: boolean;
  title: string;
  description: string | null;
}

interface NotificationEditorModalProps {
  notification: Notification;
  onClose: () => void;
  onSave: (updatedNotification: Notification) => void;
}

export default function NotificationEditorModal({
  notification,
  onClose,
  onSave,
}: NotificationEditorModalProps) {
  const [frequencyMinutes, setFrequencyMinutes] = useState(notification?.frequencyMinutes);
  const [active, setActive] = useState(notification?.active);
  const [title, setTitle] = useState(notification?.title);
  const [description, setDescription] = useState(notification?.description);

  const handleSave = async () => {
    const updatedNotification: Notification = {
      frequencyMinutes,
      active,
      title,
      description,
    };
    onSave(updatedNotification);
  };

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-pulse-fade-in bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Notification</h2>

        {/* Frequency Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frequency (minutes)
          </label>
          <input
            type="number"
            value={frequencyMinutes}
            onChange={(e) => setFrequencyMinutes(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Active Switcher */}
        <div className="mb-4 flex items-center gap-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Active</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              onChange={() => setActive(!active)}
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

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
