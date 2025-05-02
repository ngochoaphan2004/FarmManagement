// src/components/QrScanner.tsx
import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QrScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScan, onClose }) => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (result: string) => {
        setScanResult(result);
        onScan(result); // Pass the result to the parent component
        scanner.clear(); // Stop scanning after success
      },
      (error) => {
        // Optional: log scan errors
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error("Clear failed", err));
    };
  }, [onScan]);

  return (
    <div className="z-[1000] fixed inset-0 flex flex-col items-center justify-center bg-green-700">
      <h1 className="absolute top-4 text-xl font-bold text-white">
        QR Code Scanner
      </h1>
      <div
        ref={scannerRef}
        id="reader"
        className="relative w-full h-full max-w-[500px] max-h-[500px] bg-black text-white rounded-lg overflow-hidden"
      ></div>
      {scanResult && (
        <div className="absolute bottom-10 p-4 bg-white rounded-lg shadow-lg text-center max-w-md">
          <p className="text-gray-700 font-semibold text-lg">Scan Result:</p>
          <p className="text-blue-600 break-words mt-2">{scanResult}</p>
        </div>
      )}
      {!scanResult && (
        <p className="absolute bottom-10 text-white text-sm italic">
          Align the QR code within the scanner box to scan.
        </p>
      )}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Close
      </button>
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-white text-xl font-bold hover:text-gray-300"
      >
        ✕
      </button>
    </div>
  );
};

export default QrScanner;
