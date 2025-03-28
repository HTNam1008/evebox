"use client";

import { Showtime } from "../../../libs/interface/idevent.interface";

export const handleDeleteTicket = (
    showtimeId: number, 
    ticketIndex: number,
    setShowtimes: React.Dispatch<React.SetStateAction<Showtime[]>>,
    setDelShowtimeId: React.Dispatch<React.SetStateAction<number | null>>,
    setDelTicketIndex: React.Dispatch<React.SetStateAction<number | null>>
) => {
    setShowtimes((prevShowtimes) =>
        prevShowtimes.map((showtime) =>
            showtime.id === showtimeId
                ? {
                    ...showtime,
                    tickets: showtime.tickets.filter((_, index) => index !== ticketIndex),
                    showConfirmDeleteDialog: false,
                    selectedTicketIndex: null
                }
                : showtime
        )
    );

    setDelShowtimeId(null);
    setDelTicketIndex(null);
};
