export const handleOneAddOption = (
    setOneTexts: (value: string[]) => void,
    setOneCheckedItems: (value: boolean[]) => void,
    oneTexts: string[],
    oneCheckedItems: boolean[]
) => {
    setOneTexts([...oneTexts, ""]);
    setOneCheckedItems([...oneCheckedItems, false]); // Thêm trạng thái checked mới
};

export const handleOneDelete = (
    index: number,
    setOneTexts: (value: string[]) => void,
    setOneCheckedItems: (value: boolean[]) => void,
    oneTexts: string[],
    oneCheckedItems: boolean[]
) => {
    setOneTexts(oneTexts.filter((_, i) => i !== index));
    setOneCheckedItems(oneCheckedItems.filter((_, i) => i !== index)); // Xóa trạng thái checked tương ứng
};

export const toggleOneChecked = (
    index: number,
    oneCheckedItems: boolean[],
    setOneCheckedItems: (value: boolean[]) => void,
) => {
    const newChecked = [...oneCheckedItems];
    newChecked[index] = !newChecked[index]; // Đảo trạng thái checked
    setOneCheckedItems(newChecked);
};
