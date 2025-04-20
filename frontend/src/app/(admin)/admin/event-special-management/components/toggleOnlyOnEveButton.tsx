'use client'

/* Package System */
import { Check } from "lucide-react";
import toast from 'react-hot-toast';

interface EventType {
    id: number;
    isOnlyOnEve: boolean;
}

interface ToggleOnlyOnEveButtonProps {
    event: EventType;
    onToggle: (eventId: number, newIsOnlyOnEve: boolean) => void;
};

export default function ToggleOnlyOnEveButton({ event, onToggle }: ToggleOnlyOnEveButtonProps) {
    const handleClick = () => {
        const newIsOnlyOnEve = !event.isOnlyOnEve;
        onToggle(event.id, newIsOnlyOnEve);
        toast.success(
            newIsOnlyOnEve
                ? "Đã thêm vào sự kiện chỉ có trên EveBox!"
                : "Đã bỏ khỏi sự kiện chỉ có trên EveBox!"
        );
    };

    return (
        <td onClick={handleClick} className="px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
            <div title={event.isOnlyOnEve ? "Bỏ chọn" : "Chọn"} className="flex justify-center items-center">
                <div className={`rounded w-6 h-6 border cursor-pointer ${event.isOnlyOnEve ? 'bg-teal-400 text-white flex justify-center items-center' : 'bg-white border-gray-500'}`}>
                    {event.isOnlyOnEve && <Check className="w-4 h-4" />}
                </div>
            </div>
        </td>
    );
};
