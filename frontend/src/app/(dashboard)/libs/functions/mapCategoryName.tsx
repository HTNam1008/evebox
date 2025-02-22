const mapCategoryName = (categoryName: string): string => {
    const categoryMapping: Record<string, string> = {
        "music": "Âm nhạc",
        "others": "Thể loại khác",
        "theatersandart": "Sân khấu & Nghệ thuật",
        // Thêm các danh mục khác nếu cần
    };

    return categoryMapping[categoryName] || categoryName; // Nếu không có trong danh sách, giữ nguyên
};
export default mapCategoryName;