const colorList = ['bg-blue-500 hover:bg-blue-700', 'bg-indigo-500 hover:bg-indigo-700', 'bg-violet-500 hover:bg-violet-700', 'bg-emerald-500 hover:bg-emerald-700', 'bg-teal-500 hover:bg-teal-700', 'bg-green-500 hover:bg-green-700', 'bg-amber-500 hover:bg-amber-700', 'bg-orange-500 hover:bg-orange-700', 'bg-rose-500 hover:bg-rose-700', 'bg-fuchsia-500 hover:bg-fuchsia-700',];

export default function generateScheduleEvents(item: any, index: number, count: number = 20): any[] {
    const title = `Turn ${item.action} ${item.device?.deviceName ?? 'Unknown device'}`;
    const events = [];
    const now = new Date();
    const repeat = item.repeat?.toLowerCase();

    let baseDate = new Date(now); // clone để không ảnh hưởng đến `now`

    for (let i = 0; i < count; i++) {
        let eventDate: Date;

        if (repeat === 'monthly') {
            // time = "18 15:52" (ngày trong tháng + giờ)
            const [dayStr, timeStr] = item.time.split(' ');
            const [hour, minute] = timeStr.split(':').map(Number);
            const day = parseInt(dayStr);

            eventDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, day, hour, minute);
        }

        else if (repeat === 'daily') {
            // time = "15:52"
            const [hour, minute] = item.time.split(':').map(Number);
            eventDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + i, hour, minute);
        }

        else if (repeat === 'weekly') {
            // time = "Monday 15:52"
            const [weekdayStr, timeStr] = item.time.split(' ');
            const [hour, minute] = timeStr.split(':').map(Number);

            const weekdays = ["sun", "mon", "tue", "wed", "thur", "fri","sat"];
            const targetDay = weekdays.indexOf(weekdayStr.toLowerCase());

            const eventStart = new Date(baseDate);
            eventStart.setDate(eventStart.getDate() + ((7 + targetDay - eventStart.getDay()) % 7) + i * 7);
            eventStart.setHours(hour, minute, 0, 0);
            eventDate = eventStart;
        }

        else if (repeat === 'x days') {
            // repeat = "x days", time = "5 15:52"
            const [dayStr, timeStr] = item.time.split(' ');
            const date = Number(dayStr);
            const [hour, minute] = timeStr.split(':').map(Number);

            let tempBaseDate = new Date(item.lastActive)
            eventDate = new Date(tempBaseDate.getFullYear(), tempBaseDate.getMonth(), tempBaseDate.getDate() + i * date, hour, minute);
        }

        else {
            continue; // skip unknown format
        }

        events.push({
            id: item.id,
            title,
            start: eventDate.toISOString(),
            backgroundColor: colorList[Math.floor(index * colorList.length)],
            data: item
        });
    }
    return events;
}