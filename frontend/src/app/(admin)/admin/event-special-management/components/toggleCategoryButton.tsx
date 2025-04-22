'use client'

/* Package System */
import { Check } from "lucide-react";
import toast from 'react-hot-toast';

/* Package Application */
import { Category } from "../lib/interface/eventSpecialTable";

interface  EventType {
    id: number;
    categories: Category[];
}

interface ToggleCategoryButtonProps {
    event: EventType;
    fullCategory: Category;
    onToggle: (eventId: number, newCategories: Category[]) => void;
};

export default function ToggleCategoryButton({ event, fullCategory, onToggle } : ToggleCategoryButtonProps){
    const isSelected = event.categories.some((cat) => cat.id === fullCategory.id);

    const handleClick = () => {
        let newCategories: Category[];
        if (isSelected) {
            newCategories = event.categories.filter((cat) => cat.id !== fullCategory.id);
            toast.success(`Đã bỏ khỏi thể loại ${fullCategory.name}!`);
        } else {
            newCategories = [...event.categories, fullCategory];
            toast.success(`Đã thêm vào thể loại ${fullCategory.name}!`);
        }

        onToggle(event.id, newCategories);
    };

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


