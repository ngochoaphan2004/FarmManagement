import { DeviceOperation } from '@/BE-library/main';
import { useSession } from '@/providers/SessionProvider';
import { param } from 'jquery';
import React, { useEffect, useState } from 'react';

const parameters = [
    { name: 'Độ ẩm đất', value: 45, unit: '%', status: 'Tốt' },
    { name: 'Độ ẩm không khí', value: 65, unit: '%', status: 'Trung bình' },
    { name: 'Nhiệt độ không khí', value: 35, unit: '°C', status: 'Cao' },
    { name: 'Ánh sáng', value: 800, unit: 'lux', status: 'Đủ' },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Tốt':
        case 'Đủ':
            return 'text-green-600';
        case 'Trung bình':
            return 'text-yellow-500';
        case 'Cao':
        case 'Thấp':
        case 'Nguy hiểm':
            return 'text-red-500';
        default:
            return 'text-gray-500';
    }
};

interface DataType {
    created_at: Date;
    created_epoch: number;
    expiration: string;
    feed_id: number;
    feed_key: string;
    id: string;
    value: number;
}

function getTopValues(data: DataType[], count: number = 20): number[] {
    if (data !== null) {
        return data.slice(0, count).map(item => item.value);
    }
    return [undefined]
}

export default function EnvironmentTable() {
    const action = new DeviceOperation();
    const { session, status } = useSession();
    const [device, setDevice] = useState([]);
    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (status === "authenticated" && session) {
                try {
                    const listDevice = await action.searchAll(session.sid, { action: 'view' })
                    setDevice(listDevice.data);
                    console.log(listDevice.data);
                    let tempList = []
                    for (const dev of listDevice.data) {
                        const result = await action.getData(dev.id, session.sid);
                        const temp = getTopValues(result)[0]
                        tempList.push({ id: dev.id, name: dev.deviceName, data: temp, device: dev })
                    }
                    setData(tempList)
                } catch (error) {
                    setData([null]);
                }
            }
        }
        fetchData()
    }, [])


    const getSensorStatus = (sensor: string, value: number): 'Thấp' | 'Bình thường' | 'Cao' => {
        switch (sensor) {
            case 'Air':
                if (value < 20) return 'Thấp';
                if (value <= 32) return 'Bình thường';
                return 'Cao';

            case 'soil':
                if (value < 30) return 'Thấp';
                if (value <= 60) return 'Bình thường';
                return 'Cao';

            case 'light':
                if (value < 300) return 'Thấp';
                if (value <= 1000) return 'Bình thường';
                return 'Cao';

            default:
                return 'Bình thường'; // fallback an toàn
        }
    };



    const getStatusColor = (value: string): string => {
        if (value === 'Cao') return 'text-red-500';    // Thấp
        else if (value === 'Thấp') return 'text-red-500';    // Thấp
        return 'text-green-600';  // Tốt
    };


    return (
        <div className="max-w-xl mx-auto mb-3 content-center">
            <h2 className="text-xl font-semibold mb-4">Thông số môi trường</h2>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-800">
                {Data.map((param, index) => {
                    let status = getSensorStatus(param.device.type, param.data)
                    return (
                        <React.Fragment key={index}>
                            <div className="font-medium">{param.name}</div>
                            <div>{param.data}</div>
                            <div className={`font-semibold ${getStatusColor(status)}`}>
                                {status}
                            </div>
                        </React.Fragment>

                    )
                })}
            </div>
        </div>
    );
}
