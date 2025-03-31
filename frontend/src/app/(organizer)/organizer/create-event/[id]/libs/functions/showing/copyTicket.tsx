import { Showtime } from "../../../libs/interface/idevent.interface";

export const handleCopyTickets = (
    selectedShowtimeId: string | null,
    showtimes: Showtime[],
    currentShowtimeId: string,
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

        // Copy tickets and reset their id to ""
        const copiedTickets = sourceShowtime.tickets.map(ticket => ({
            ...ticket,
            id: "" // Reset ticket ID
        }));

        updatedShowtimes[targetShowtimeIndex] = {
            ...updatedShowtimes[targetShowtimeIndex],
            tickets: copiedTickets
        };

        setShowtimes(updatedShowtimes);
        onClose();  // Close modal after copying
    }
};