const mapCategoryName = (categoryName: string): string => {
    const categoryMapping: Record<string, string> = {
        "music": "Âm nhạc",
        "other": "Thể loại khác",
        "theaterstandard": "Sân khấu & Nghệ thuật",
        "sport": "Thể thao"
    };

    return categoryMapping[categoryName] || categoryName; // Nếu không có trong danh sách, giữ nguyên
};
export default mapCategoryName;