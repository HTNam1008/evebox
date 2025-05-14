'use client'

/* Package System */
import { Check } from "lucide-react";
import toast from 'react-hot-toast';

/* Package Application */
import { Category } from "../lib/interface/eventSpecialTable";
import { updateEventAdmin } from "@/services/event.service";

interface EventType {
    id: number;
    categoryIds: Category[];
}

interface ToggleCategoryButtonProps {
    event: EventType;
    fullCategory: Category;
    onToggle: (eventId: number, newCategories: Category[]) => void;
    setGlobalLoading: (val: boolean) => void;
};

export default function ToggleCategoryButton({ event, fullCategory, onToggle, setGlobalLoading }: ToggleCategoryButtonProps) {
    const isSelected = event.categoryIds.some((cat) => cat.id === fullCategory.id);

    // const handleClick = () => {
    //     let newCategories: Category[];
    //     if (isSelected) {
    //         newCategories = event.categoryIds.filter((cat) => cat.id !== fullCategory.id);
    //         toast.success(`Đã bỏ khỏi thể loại ${fullCategory.name}!`);
    //     } else {
    //         newCategories = [...event.categoryIds, fullCategory];
    //         toast.success(`Đã thêm vào thể loại ${fullCategory.name}!`);
    //     }

    //     onToggle(event.id, newCategories);
    // };

    const handleClick = async () => {
        setGlobalLoading(true);

        let newCategories: Category[] = [];

        if (isSelected) {
            newCategories = event.categoryIds.filter((cat) => cat.id !== fullCategory.id);
        } else {
            newCategories = [...event.categoryIds, fullCategory];
        }

        try {
            const result = await updateEventAdmin(event.id, {
                categoryIds: newCategories.map((c) => c.id),
                isSpecialForCategory: true
            })

            if (result === true) {
                onToggle(event.id, newCategories);
                toast.success(
                    isSelected
                        ? `Đã bỏ khỏi thể loại ${fullCategory.name}!`
                        : `Đã thêm vào thể loại ${fullCategory.name}!`
                );
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật!")
            }
        } catch (error) {
            console.error("🚀 ~ handleClick ~ error:", error)
            toast.error("Có lỗi xảy ra khi cập nhật!")
        } finally {
            setGlobalLoading(false);
        }
    }

    return (
        <div
            title={isSelected ? "Bỏ chọn" : "Chọn"}
            onClick={handleClick}
            className="change-category-btn flex justify-center items-center cursor-pointer"
        >
            <div
                className={`rounded w-6 h-6 border ${isSelected
                    ? 'bg-teal-400 text-white border-teal-500 flex justify-center items-center'
                    : 'bg-white border-gray-500'}`}
            >
                {isSelected && <Check className="w-4 h-4" />}
            </div>
        </div>
    );
};


