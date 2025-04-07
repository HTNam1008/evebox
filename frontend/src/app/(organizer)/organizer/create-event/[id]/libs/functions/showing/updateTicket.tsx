"use client";

import { TicketProps } from "../../../libs/interface/dialog.interface";
import { Showtime } from "../../../libs/interface/idevent.interface";

export const updateTicket = (
    showtimeId: number, 
    ticketIndex: number, 
    updatedTicket: TicketProps,
    setShowtimes: React.Dispatch<React.SetStateAction<Showtime[]>>,
    setEditShowtimeId: React.Dispatch<React.SetStateAction<number | null>>,
    setEditTicketIndex: React.Dispatch<React.SetStateAction<number | null>>
) => {
    setShowtimes((prevShowtimes) =>
        prevShowtimes.map((showtime) =>
            showtime.id === showtimeId
                ? {
                    ...showtime,
                    tickets: showtime.tickets.map((ticket, index) =>
                        index === ticketIndex ? updatedTicket : ticket
                    )
                }
                : showtime
        )
    );
    setEditShowtimeId(null);
    setEditTicketIndex(null);
};