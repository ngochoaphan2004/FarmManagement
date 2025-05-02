"use client";

import React, { useState } from "react";
import QrScanner from "@/components/QrScan/QrScan"; // Adjust the import path as needed
import { useSession } from "@/providers/SessionProvider";

interface Device {
  deviceName: string;
  action: "view" | "trigger";
  qrCode?: string;
  status: string;
  userId: string;
  type: "light" | "soil" | "air" | "pump";
}

interface AddDeviceModalProps {
  userID: string,
  onClose: () => void;
  onSave: (device: Device) => void;
}

export default function AddDeviceModal({ userID, onClose, onSave }: AddDeviceModalProps) {
  const [method, setMethod] = useState<"qr" | "manual">("qr");
  const [qrCode, setQrCode] = useState("");
  const [qrRepo, setRepo] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [action, setAction] = useState<"view" | "trigger">("view");
  const [status, setstatus] = useState("Auto");
  const { session } = useSession()
  const [type, setType] = useState<"light" | "soil" | "air" | "pump">("light");
  const [showQrScanner, setShowQrScanner] = useState(false);
  //   const {session, status} =useSession()
  const parseQrCode = (code: string) => {
    try {
      const parsedData = JSON.parse(code); // Parse the JSON string
      setDeviceName(parsedData.deviceName || "");
      setAction(parsedData.action || "view");
      setQrCode(parsedData.qrCode || "");
      setstatus(parsedData.status || "");
      setType(parsedData.type || "light");
      console.log(parsedData)
    } catch (error) {
      console.error("Error parsing QR code:", error);
    }
  };

  const handleSave = () => {
    const newDevice: Device = {
      deviceName,
      action,
      qrCode: method === "qr" ? qrCode : undefined,
      status,
      userId: userID,
      type,
    };
    onSave(newDevice);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {showQrScanner ? (
        <QrScanner
          onScan={(result) => {
            setQrCode(result);
            parseQrCode(result);
            setShowQrScanner(false);
          }}
          onClose={() => setShowQrScanner(false)}
        />
      ) : (
        <div className="animate-pulse-fade-in bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add Device</h2>

          {/* Method Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as "qr" | "manual")}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="qr">QR Code</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          {method === "qr" ? (
            // QR Code Input
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                QR Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={qrCode}
                  onChange={(e) => {
                    setQrCode(e.target.value);
                    parseQrCode(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <button
                  onClick={() => setShowQrScanner(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Scan
                </button>
              </div>
            </div>
          ) : (
            // Manual Input Fields
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Name
                </label>
                <input
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Action
                </label>
                <select
                  value={action}
                  onChange={(e) => setAction(e.target.value as "view" | "trigger")}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="view">View</option>
                  <option value="trigger">Trigger</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={action}
                  disabled = {type === "light"}
                  onChange={(e) => setstatus(e.target.value as "Auto" | "Manual" | "Manual Only")}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  {type !== "light" ? (
                    <>
                      <option value="Auto">Auto</option>
                      <option value="Manual">Manual</option>
                      <option value="Manual Only">Manual Only</option>
                    </>
                  ) : (
                    <option value="Auto">Auto</option>
                  )}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "light" | "soil" | "air" | "pump")}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="light">Light</option>
                  <option value="soil">Soil</option>
                  <option value="air">Air</option>
                  <option value="pump">Pump</option>
                </select>
              </div>
            </>
          )}

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
      )}
    </div>
  );
}
