'use client';

import { useState } from "react";
import Image from "next/image";
import { Showing } from "../libs/event.interface";
import { useRouter } from "next/navigation";

const TicketDetails = ({ showings }: { showings: Showing[] }) => {
  const [expandedShowId, setExpandedShowId] = useState<string | null>(null);
  // const [isTicketInfoExpanded, setIsTicketInfoExpanded] = useState(false);
  // const [isTicketNoteExpanded, setIsTicketNoteExpanded] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center mt-8 ml-2" id="info-ticket">
        <div className="w-full md:w-5/6">
          <h2 className="text-xl md:text-2xl font-bold">Thông tin vé</h2>
          <div className="card mt-3">
            <ul className="list-group list-group-flush">
              {showings.map((showing) => (
                <li key={showing.id} className="list-group-item li-ticket">
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Toggle Button for Show Details */}
                    <div className="d-flex text-ticket" onClick={() => setExpandedShowId(expandedShowId === showing.id ? null : showing.id)}>
                      <div className="mr-2">
                        {expandedShowId === showing.id ? (
                          <i className="bi bi-chevron-down"></i>
                        ) : (
                          <i className="bi bi-chevron-right"></i>
                        )}
                      </div>
                      {new Date(showing.startTime).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(showing.endTime).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      {new Date(showing.startTime).toLocaleDateString("vi-VN")}
                    </div>

                    {/* Button: Show Availability */}
                    {showing.status === "sold_out" ? (
                      <button type="button" className="btn-sold-out">Hết vé</button>
                    ) : (
                      <button type="button" className="btn-buy" onClick={() => router.push(`/event/${showing.eventId}/booking/select-ticket`)}>Mua vé ngay</button>
                    )}
                  </div>

                  {/* Ticket Types for This Showing */}
                  {expandedShowId === showing.id && (
                    <ul className="ul-ticket-item">
                      {showing.TicketType.map((ticket) => (
                        <li key={ticket.id} className="list-group-item li-ticket-item p-0">
                          <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                            <div className="d-flex ml-4 text-ticket">
                              {ticket.name}
                            </div>
                            <div className="d-flex flex-column align-items-end">
                              <p className="price mb-0">{ticket.price.toLocaleString("vi-VN")}đ</p>
                            </div>
                          </div>
                          {/* Ticket Image */}
                          {ticket.imageUrl && (
                            <div className="text-center">
                              <Image width={140}
                                height={100} src={ticket.imageUrl} alt={ticket.name} className="w-32 rounded-lg shadow-md" />
                            </div>
                          )}
                          {/* Ticket Description */}
                          <div style={{ whiteSpace: 'pre-line' }}>
                            <p className="text-white-500 text-sm mt-2">{ticket.description}</p>
                          </div>
                          <hr />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex justify-center mt-8 ml-2">
        <div className="w-full md:w-5/6">
          <h2 className="text-xl md:text-2xl font-bold">Liên hệ người tổ chức</h2>
          <p className="card-text mt-2">
            Vui lòng truy cập <a href="#">www.sneakypeeks.com</a> và tham khảo phần Câu hỏi thường gặp để biết thêm chi tiết.
          </p>
        </div>
      </div>
    </>
  )
};

export default TicketDetails;