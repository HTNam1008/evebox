import { Showtime } from "../../../libs/interface/idevent.interface";

export const handleCopyTickets = (
    selectedShowtimeId: number | null,
    showtimes: Showtime[],
    currentShowtimeId: number,
    setShowtimes: (updatedShowtimes: Showtime[]) => void,
    onClose: () => void
) => {
    if (!selectedShowtimeId) {
        alert("Vui lòng chọn suất diễn để sao chép vé!");
        return;
    }

    const sourceShowtime = showtimes.find(show => show.id === selectedShowtimeId);
    const targetShowtimeIndex = showtimes.findIndex(show => show.id === currentShowtimeId);

    if (sourceShowtime && targetShowtimeIndex !== -1) {
        const updatedShowtimes = [...showtimes];
        updatedShowtimes[targetShowtimeIndex] = {
            ...updatedShowtimes[targetShowtimeIndex],
            tickets: [...sourceShowtime.tickets] // Copy vé từ suất diễn được chọn
        };
        setShowtimes(updatedShowtimes);
        onClose();  // Đóng modal sau khi sao chép
    }
};