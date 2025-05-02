"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import NotificationEditorModal from "./modal";
interface Notification {
  id: string;
  frequencyMinutes: number;
  lastSentAt: Date | null;
  active: boolean;
  title: string;
  description: string | null;
}

export default function NotificationList() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      frequencyMinutes: 30,
      lastSentAt: new Date(),
      active: true,
      title: "Temperature Alert",
      description: "The temperature has exceeded the threshold.",
    },
    {
      id: "2",
      frequencyMinutes: 60,
      lastSentAt: null,
      active: false,
      title: "Humidity Alert",
      description: "The humidity level is too low.",
    },
  ]);
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, active: !notification.active } : notification
      )
    );
  };

  const handleEdit = (notification: Notification) => {
    setEditingNotification(notification);
  };

  const closePopup = () => {
    setEditingNotification(null);
  };

  return (
    <div className="h-screen w-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] 
    bg-[size:14px_32px]">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Notification List</h1>
        <button
          onClick={() => router.push(`/[locale]/(user)/device`)} // Navigate back to the device page
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Back to Device
        </button>
      </div>
      <div className="pt-8 p-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {notifications.map(({ id, frequencyMinutes, lastSentAt, active, title, description }) => (
          <div
            key={id}
            className="bg-white rounded-lg p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-lg font-bold text-gray-800">{title}</div>
            <div className="text-sm mt-3 text-gray-600">
              <div className="mb-1">
                <strong>Frequency:</strong> Every {frequencyMinutes} minutes
              </div>
              <div className="mb-1">
                <strong>Last Sent:</strong> {lastSentAt ? lastSentAt.toLocaleString() : "Never"}
              </div>
              <div>
                <strong>Description:</strong> {description || "No description provided"}
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between w-full">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleNotification(id)}
                  className="sr-only peer"
                />
                <div
                  className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"
                ></div>
                <div
                  className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"
                ></div>
              </label>
              <button
                onClick={() => handleEdit({ id, frequencyMinutes, lastSentAt, active, title, description })}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {editingNotification && (
        <NotificationEditorModal
          notification={editingNotification} // Pass the notification being edited
          onClose={closePopup}
          onSave={(updatedNotification) => {
            setNotifications((prev) =>
              prev.map((notification) =>
                notification.id === updatedNotification.id ? updatedNotification : notification
              )
            );
            closePopup();
          }}
        />
      )}
    </div>
  );
}

