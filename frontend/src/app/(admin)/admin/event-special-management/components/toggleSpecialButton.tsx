'use client'

/* Package System */
import { Check } from "lucide-react";
import toast from 'react-hot-toast';

interface EventType {
    id: number;
    isSpecial: boolean;
}

interface ToggleSpecialButtonProps {
    event: EventType;
    onToggle: (eventId: number, newIsSpecial: boolean) => void;
};

export default function ToggleSpecialButton({ event, onToggle }: ToggleSpecialButtonProps) {
    const handleClick = () => {
        const newIsSpecial = !event.isSpecial;
        onToggle(event.id, newIsSpecial);
        toast.success(
            newIsSpecial
                ? "Đã thêm vào sự kiện đặc biệt!"
                : "Đã bỏ khỏi sự kiện đặc biệt!"
        );
    };

    return (
        <td onClick={handleClick} className="px-4 py-3 border-r border-gray-200 text-center cursor-pointer max-w-[200px] align-middle">
            <div title={event.isSpecial ? "Bỏ chọn" : "Chọn"} className="flex justify-center items-center">
                <div className={`rounded w-6 h-6 border cursor-pointer ${event.isSpecial ? 'bg-teal-400 text-white flex justify-center items-center' : 'bg-white border-gray-500'}`}>
                    {event.isSpecial && <Check className="w-4 h-4" />}
                </div>
            </div>
        </td>
    );
};
