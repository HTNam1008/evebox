import { Showtime } from "../../../libs/interface/idevent.interface";

export const handleCopyTickets = (
selectedShowtimeId: string | null, showtimes: Showtime[], currentShowtimeId: string, startDate: Date | null, endDate: Date | null, setShowtimes: (updatedShowtimes: Showtime[]) => void, onClose: () => void) => {
    if (!selectedShowtimeId) {
        alert("Vui lòng chọn suất diễn để sao chép vé!");
        return;
    }

    const sourceShowtime = showtimes.find(show => show.id === selectedShowtimeId);
    console.log("Target showtime id:", showtimes);

    const targetShowtimeIndex = showtimes.findIndex(show => show.startDate?.toISOString() == startDate?.toISOString() && show.endDate?.toISOString() === endDate?.toISOString());
    console.log("Target showtime id:", targetShowtimeIndex);
    console.log("Current showtime id:", currentShowtimeId);

    if (sourceShowtime && targetShowtimeIndex !== -1) {
        const updatedShowtimes = [...showtimes];

        // Copy tickets and reset their id to ""
        const copiedTickets = sourceShowtime.tickets.map(ticket => ({
            ...ticket,
            id: "" // Reset ticket ID
        }));
        console.log("Copy ticket:", copiedTickets);

        updatedShowtimes[targetShowtimeIndex] = {
            ...updatedShowtimes[targetShowtimeIndex],
            tickets: copiedTickets
        };

        setShowtimes(updatedShowtimes);
        console.log(showtimes);

        onClose();  // Close modal after copying
    }
};