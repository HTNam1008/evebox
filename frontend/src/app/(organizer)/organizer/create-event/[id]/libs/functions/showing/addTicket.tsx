"use client";

import { TicketProps } from "../../../libs/interface/dialog.interface";
import { Showtime } from "../../../libs/interface/idevent.interface";

export const addTicket = (
    showtimeId: number, 
    newTicket: TicketProps,
    setShowtimes: React.Dispatch<React.SetStateAction<Showtime[]>>
) => {
    setShowtimes((prevShowtimes) =>
        prevShowtimes.map((showtime) =>
            showtime.id === showtimeId
                ? { ...showtime, tickets: [...showtime.tickets, newTicket] }
                : showtime
        )
    );
};