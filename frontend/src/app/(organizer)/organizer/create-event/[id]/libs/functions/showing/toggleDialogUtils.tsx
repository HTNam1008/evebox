import { Showtime } from "../../../libs/interface/idevent.interface";

export const toggleExpanded = (
    id: number,
    setShowtimes: React.Dispatch<React.SetStateAction<Showtime[]>>
) => {
    setShowtimes((prevShowtimes) =>
        prevShowtimes.map((showtime) =>
            showtime.id === id ? { ...showtime, isExpanded: !showtime.isExpanded } : showtime
        )
    );
};

export const toggleDialog = (
    id: number,
    setShowtimes: React.Dispatch<React.SetStateAction<Showtime[]>>
) => {
    setShowtimes((prevShowtimes) =>
        prevShowtimes.map((showtime) =>
            showtime.id === id ? { ...showtime, showDialog: !showtime.showDialog } : showtime
        )
    );
};

export const toggleEditDialog = (
    id: number,
    setShowtimes: React.Dispatch<React.SetStateAction<Showtime[]>>
) => {
    setShowtimes((prevShowtimes) =>
        prevShowtimes.map((showtime) =>
            showtime.id === id ? { ...showtime, showEditDialog: !showtime.showEditDialog } : showtime
        )
    );
};

export const toggleDelDialog = (
    id: number,
    setShowtimes: React.Dispatch<React.SetStateAction<Showtime[]>>
) => {
    setShowtimes((prevShowtimes) =>
        prevShowtimes.map((showtime) =>
            showtime.id === id ? { ...showtime, showConfirmDeleteDialog: !showtime.showConfirmDeleteDialog } : showtime
        )
    );
};