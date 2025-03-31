"use client";

import { BaseApiResponse } from "@/types/BaseApiResponse";
import { Showtime } from "../../../libs/interface/idevent.interface";
import createApiClient from '@/services/apiClient';


const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");


export const handleDeleteShow = async (
    showtimeId: string, 
    setShowtimes: React.Dispatch<React.SetStateAction<Showtime[]>>,
    setDelShowtimeId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
    setShowtimes((prevShowtimes) =>
        prevShowtimes.filter((showtime) => showtime.id !== showtimeId) 
    );
     console.log(`Deleting showtime with ID: ${showtimeId}`);
     const response = await apiClient.delete<BaseApiResponse>(
                                    `/api/org/showing/${showtimeId}`
                                );
        
      if (response.status === 200) {
                                    console.log(`Showtime ${showtimeId} deleted successfully!`);
                                } else {
                                    alert(`Error deleting showtime: ${response.statusText}`);
                                }
    setDelShowtimeId(null);
    console.log("Deleted showtime:", showtimeId);
};
