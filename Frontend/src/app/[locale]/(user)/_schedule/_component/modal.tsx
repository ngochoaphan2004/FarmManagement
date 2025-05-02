"use client";

import React, { useState } from "react";

interface Notification {
  id: string;
  frequencyMinutes: number;
  lastSentAt: Date | null;
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
  const [frequencyMinutes, setFrequencyMinutes] = useState(notification.frequencyMinutes);
  const [lastSentAt, setLastSentAt] = useState<Date | null>(notification.lastSentAt);
  const [active, setActive] = useState(notification.active);
  const [title, setTitle] = useState(notification.title);
  const [description, setDescription] = useState(notification.description);

  const handleSave = () => {
    const updatedNotification: Notification = {
      ...notification,
      frequencyMinutes,
      active,
      title,
      description,
    };
    onSave(updatedNotification);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
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


        {/* Active Checkbox */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="mr-2"
            />
            Active
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
