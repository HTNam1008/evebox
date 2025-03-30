"use client";

import { Showtime } from "../../../libs/interface/idevent.interface";

export const handleDeleteShow = (
    showtimeId: number, 
    setShowtimes: React.Dispatch<React.SetStateAction<Showtime[]>>,
    setDelShowtimeId: React.Dispatch<React.SetStateAction<number | null>>,
) => {
    setShowtimes((prevShowtimes) =>
        prevShowtimes.filter((showtime) => showtime.id !== showtimeId) 
    );
    setDelShowtimeId(null);
    console.log("Deleted showtime:", showtimeId);
};
