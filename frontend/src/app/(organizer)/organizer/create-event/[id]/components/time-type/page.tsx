"use client";

/* Package System */
import React from 'react';
import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import { Divider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

/* Package Application */
import Navigation from '../common/navigation';
import FormTimeTypeTicketClient from './components/formTimeType';
import { Showtime, TimeAndTypeTicketsProps } from '../../libs/interface/idevent.interface';
import createApiClient from '@/services/apiClient';
import { BaseApiResponse } from '@/types/BaseApiResponse';
import AlertDialog from './components/dialogs/alertDialog';

async function urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
}

export default function TimeAndTypeTickets({ eventId }: TimeAndTypeTicketsProps) {
    const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");
    const router = useRouter();
    const [step] = useState(2);
    const [btnValidate2, setBtnValidte2] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
    

    // New state to store showtimes received from FormTimeTypeTicketClient
    const [showingList, setShowingList] = useState<Showtime[]>([]);

    const processShowtimeAndTickets = async (showing: Showtime, newShowId: string) => {
        try {
            let response;
    
            // Handle Showtime deletion
            if (showing.id === "Deleted") {
                console.log(`Deleting showtime with ID: ${showing.id}`);
                response = await apiClient.delete<BaseApiResponse>(`/api/org/showing/${showing.id}`);
    
                if (response.status === 200) {
                    console.log(`Showtime ${showing.id} deleted successfully!`);
                } else {
                    alert(`Error deleting showtime: ${response.statusText}`);
                }
                return;
            }
    
            // Handle Showtime creation or update
            if (!showing.id) {
                // Create new showing (POST)
                response = await apiClient.post<BaseApiResponse>(`/api/org/showing/${eventId}`, {
                    startTime: showing.startDate,
                    endTime: showing.endDate,
                });
    
                if (response.status === 201) {
                    console.log(`Showtime created successfully! ID: ${newShowId}`);
                } else {
                    alert(`Error creating showtime: ${response.statusText}`);
                    return;
                }
            } else {
                // Update existing showing (PUT)
                response = await apiClient.put<BaseApiResponse>(`/api/org/showing/${showing.id}`, {
                    startTime: showing.startDate,
                    endTime: showing.endDate,
                });
    
                if (response.status === 200) {
                    console.log(`Showtime ${showing.id} updated successfully!`);
                } else {
                    alert(`Error updating showtime: ${response.statusText}`);
                    return;
                }
            }
    
            // Process tickets for the current showtime
            await Promise.all(
                showing.tickets.map(async (ticket) => {
                    try {
                        let ticketResponse;
                        const formData = new FormData();
                        formData.append("name", ticket.name);
                        formData.append("description", ticket.information);
                        formData.append("color", "#000000"); // Placeholder
                        formData.append("isFree", String(ticket.free));
                        formData.append("originalPrice", ticket.price);
                        formData.append("startTime", (ticket.startDate ?? new Date()).toISOString());
                        formData.append("endTime", (ticket.endDate ?? new Date()).toISOString());
                        formData.append("position", "0"); // Placeholder
                        formData.append("quantity", "100"); // Placeholder
                        formData.append("maxQtyPerOrder", ticket.max);
                        formData.append("minQtyPerOrder", ticket.min);
                        formData.append("isHidden", "false"); // Placeholder
    
                        if (typeof ticket.image === "string" && ticket.image.startsWith("http")) {
                            ticket.image = await urlToFile(ticket.image, "ticket-image.png");
                        }
    
                        if (ticket.image instanceof File) {
                            formData.append("file", ticket.image);
                        } else {
                            console.warn("Skipping image upload: ticket.image is not a File");
                        }
    
                        if (!ticket.id) {
                            // Create new ticket (POST)
                            ticketResponse = await apiClient.post<BaseApiResponse>(
                                `/api/org/ticketType/create/${newShowId}`,
                                formData,
                                { headers: { "Content-Type": "multipart/form-data" } }
                            );
    
                            if (ticketResponse.status === 201) {
                                console.log(`Ticket created successfully!`);
                            } else {
                                alert(`Error creating ticket: ${ticketResponse.statusText}`);
                            }
                        } else {
                            // Update existing ticket (PUT)
                            ticketResponse = await apiClient.put<BaseApiResponse>(
                                `/api/org/ticketType/${ticket.id}`,
                                formData,
                                { headers: { "Content-Type": "multipart/form-data" } }
                            );
    
                            if (ticketResponse.status === 200) {
                                console.log(`Ticket ${ticket.id} updated successfully!`);
                            } else {
                                alert(`Error updating ticket: ${ticketResponse.statusText}`);
                            }
                        }
                    } catch (error) {
                        console.error(`Failed to process ticket:`, error);
                        alert(`Error saving ticket data.`);
                    }
                })
            );
        } catch (error) {
            console.error(`Failed to process showtime:`, error);
            alert(`Error saving showtime data.`);
        }
    };
    

    const handleSave = async () => {
        setBtnValidte2("Save");
    
        if (!showingList.length) {
            console.log("No showtimes to save!");
            return;
        }
    
        try {
            // Process showings and tickets concurrently
            await Promise.all(
                showingList.map(async (showing) => {
                    const newShowId = showing.id;
                    await processShowtimeAndTickets(showing, newShowId);
                })
            );
            console.log("All showtimes and tickets processed.");
            return true;  // Indicate success
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Unexpected error occurred. Please try again.");
            return false;  // Indicate failure
        }
    };
    
    const handleContinue = async () => {
        setBtnValidte2("Continue"); 

        if (!showingList.length) {
            console.log("No showtimes to save!");
            return;
        }
    
        try {
            // Process showings and tickets concurrently
            await Promise.all(
                showingList.map(async (showing) => {
                    const newShowId = showing.id;
                    await processShowtimeAndTickets(showing, newShowId);
                })
            );
            console.log("All showtimes and tickets processed.");
            return true;  // Indicate success
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Unexpected error occurred. Please try again.");
            return false;  // Indicate failure
        }
    };

    const handleNextStep = () => {
        //Tạm ẩn bước 3
        // router.push(`/organizer/create-event/${eventId}?step=setting`);
        router.push(`/organizer/create-event/${eventId}?step=questions`);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center p-10 relative">
                <span className="text-3xl font-semibold mb-6">Thời gian và loại vé</span>
                <div className="w-full flex justify-center">
                    <ol className="flex space-x-6">
                        <Navigation step={step} />
                        <div className="flex gap-4 mt-4 mb-6">
                            <button className="text-xs w-18 border-2 border-[#0C4762] text-[#0C4762] font-bold py-2 px-4 rounded bg-white hover:bg-[#0C4762] hover:text-white transition-all"
                                type="submit" form="ticket-form" onClick={handleSave}
                            >
                                Lưu
                            </button>
                        </div>

                        <div className="flex gap-4 mt-4 mb-6">
                            <button className="text-xs w-30 border-2 border-[#51DACF] text-[#0C4762] font-bold py-2 px-4 rounded bg-[#51DACF] hover:bg-[#0C4762] hover:border-[#0C4762] hover:text-white transition-all"
                                type="submit" form="ticket-form" onClick={handleContinue}>
                                Tiếp tục
                            </button>
                        </div>
                    </ol>
                </div>

                <Divider />
            </div>

            <div className="flex justify-center">
                <FormTimeTypeTicketClient onNextStep={handleNextStep} btnValidate2={btnValidate2} setShowingList={setShowingList} eventId={eventId}/>
            </div>
            {/* Success Dialog */}
            <AlertDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onConfirm={function (): void {
                throw new Error('Function not implemented.');
            } } />
        </>
    );
}
