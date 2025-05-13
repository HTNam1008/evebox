'use client'

/* Package System */
import { Check } from "lucide-react";
import toast from 'react-hot-toast';

/* Package Application */
import { updateEventAdmin } from "@/services/event.service";

interface EventType {
    id: number;
    isOnlyOnEve: boolean;
}

interface ToggleOnlyOnEveButtonProps {
    event: EventType;
    onToggle: (eventId: number, newIsOnlyOnEve: boolean) => void;
    setGlobalLoading: (val: boolean) => void;
};

export default function ToggleOnlyOnEveButton({ event, onToggle, setGlobalLoading }: ToggleOnlyOnEveButtonProps) {
    const handleClick = async () => {
        const newIsOnlyOnEve = !event.isOnlyOnEve;
        setGlobalLoading(true);

        try {
            const result = await updateEventAdmin(event.id, {
                isOnlyOnEve: newIsOnlyOnEve
            });

            if (result === true) {
                onToggle(event.id, newIsOnlyOnEve);
                toast.success(newIsOnlyOnEve ? "Đã thêm vào sự kiện chỉ có trên EveBox!" : "Đã bỏ khỏi sự kiện chỉ có trên EveBox!");
            } else {
                toast.error('Có lỗi xảy ra khi cập nhật!');
            }
        } catch (error) {
            console.error("🚀 ~ handleClick ~ error:", error)
            toast.error("Có lỗi xảy ra khi cập nhật!")
        } finally {
            setGlobalLoading(false);
        }
    }

    return (
        <td onClick={handleClick} className="change-only-btn px-4 py-3 border-r border-gray-200 cursor-pointer max-w-[200px] align-middle">
            <div title={event.isOnlyOnEve ? "Bỏ chọn" : "Chọn"} className="flex justify-center items-center">
                <div className={`rounded w-6 h-6 border cursor-pointer ${event.isOnlyOnEve ? 'bg-teal-400 text-white flex justify-center items-center' : 'bg-white border-gray-500'}`}>
                    {event.isOnlyOnEve && <Check className="w-4 h-4" />}
                </div>
            </div>
        </td>
    );
};
