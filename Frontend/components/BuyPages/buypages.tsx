"use client";
"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const BuyPages: React.FC = () => {
    const [a3Quantity, setA3Quantity] = useState<number | string>(0);
    const [a4Quantity, setA4Quantity] = useState<number | string>(0);

    const handleA3Change = (e) => {
        const value = e.target.value;
        setA3Quantity(value === "" ? "" : Number(value));
    };

    const handleA4Change = (e) => {
        const value = e.target.value;
        setA4Quantity(value === "" ? "" : Number(value));
    };

    const handleFocus = (setQuantity) => {
        setQuantity(prev => (prev === 0 ? "" : prev));
    };

    const handlePurchase = (e) => {
        alert(`Mua ${a3Quantity} trang A3 và ${a4Quantity} trang A4`);
        setA3Quantity(0);
        setA4Quantity(0);
        console.log(e)
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="mb-20">
                <div className="text-4xl font-bold text-center mb-2">MUA TRANG IN</div>
                <p className="text-center mb-6 font-bold">Vui lòng chọn nhập số lượng cho từng loại giấy muốn mua</p>
            </div>
            <div className="flex space-x-16">

                <div className="flex flex-col items-center mr-20">
                    <div className="bg-white p-4 rounded relative w-40 h-56">
                        <Image
                            src="/photos/paper A3.png"
                            alt="A3 Paper"
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            style={{ objectFit: 'cover' }}
                            className="rounded"
                        />
                    </div>
                    <label className="mt-2 flex items-center font-bold">
                        <span className="mr-2 -ml-20">Số lượng:</span>
                        <input
                            type="number"
                            className="border rounded w-25 mt-1 px-2 py-1 text-center bg-gray-300"
                            value={a3Quantity}
                            onChange={handleA3Change}
                            onFocus={() => handleFocus(setA3Quantity)}
                        />
                    </label>
                </div>

                <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded relative w-40 h-56">
                        <Image
                            src="/photos/paper A4.png"
                            alt="A3 Paper"
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            style={{ objectFit: 'cover' }}
                            className="rounded"
                        />
                    </div>

                    <label className="mt-2 flex items-center font-bold">
                        <span className="mr-2 -ml-20">Số lượng:</span>
                        <input
                            type="number"
                            className="border rounded w-25 mt-1 px-2 py-1 text-center bg-gray-300"
                            value={a4Quantity}
                            onChange={handleA4Change}
                            onFocus={() => handleFocus(setA4Quantity)}
                        />
                    </label>
                </div>
            </div>

            <button
                onClick={handlePurchase}
                className="bg-blue-600 text-white px-20 py-2 rounded mt-10 hover:bg-blue-700 font-bold"
            >
                Mua
            </button>
        </div>
    );
};

export default BuyPages;
