"use client";

/* Package System */
import React, { useState } from "react";
import { Seat, SeatMap } from "@/types/model/seatmap";

/* Package Application */
import "@/../public/styles/showing/seatmap.css";
import AlertDialog from "../components/alertDialog";

interface SeatMapProps {
  seatMap: SeatMap;
  onSeatSelectionChange?: (
    seat: {
      id: number;
      ticketTypeId: string
    },
    isSelected: boolean
  ) => void;
}

const SeatMapComponent: React.FC<SeatMapProps> = ({ seatMap, onSeatSelectionChange }) => {
  const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set());
  const [zoom, setZoom] = useState<number>(1);
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY;
    setZoom((prev: number) => {
      let newZoom = prev;
      if (delta < 0) {
        // wheel up: increase zoom
        newZoom = prev * 1.1;
      } else {
        // wheel down: decrease zoom
        newZoom = prev / 1.1;
      }

      return Math.min(Math.max(newZoom, 0.5), 3);
    });
  }

  const handleSeatClick = (seat: Seat, sectionTicketTypeId: string, status: number) => {
    if (status === 2) return;

    if (selectedTicketType && selectedTicketType !== sectionTicketTypeId) {
      setAlertMessage("Bạn chỉ được chọn chỗ ngồi của 1 loại vé duy nhất.");
      setAlertOpen(true);
      return;
    }
    
    const newSeatSelected = new Set(selectedSeats);
    const isSelected = newSeatSelected.has(seat.id);
    if (isSelected) {
      newSeatSelected.delete(seat.id);
    } else {
      newSeatSelected.add(seat.id);
    }

    // lần đầu chọn -> set loại vé được chọn
    if (!selectedTicketType && !isSelected) {
      setSelectedTicketType(sectionTicketTypeId);
    }
    // không còn ghế được chọn -> reset selectedTicketType
    if (newSeatSelected.size === 0) {
      setSelectedTicketType(null);
    }

    setSelectedSeats(newSeatSelected);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onSeatSelectionChange?.({ id: seat.id, ticketTypeId: sectionTicketTypeId }, !isSelected);
  };

  const getSeatLabel = (rowName: string, seatName: string): string => {
    return `${rowName}-${seatName}`;
  }

  const selectedSeatLabels: string[] = [];
  if (seatMap.Section) {
    seatMap?.Section?.forEach((section) => {
      section?.Row?.forEach((row) => {
        row.Seat.forEach((seat) => {
          if (selectedSeats.has(seat.id)) {
            selectedSeatLabels.push(getSeatLabel(row.name, seat.name));
          }
        });
      });
    });
  }

  const stageSections = seatMap.Section?.filter(s => s.isStage);
  const normalSections = seatMap.Section?.filter(s => !s.isStage);

  return (
    <div className="seatmap-container relative overflow-hidden" onWheel={handleWheel}>
      <div className="seatmap-legend-container absolute top-0 left-[50%] transform -translate-x-1/2 z-10 bg-white bg-opacity-80 w-full">
        <div className="mb-3 seatmap-legend justify-between">
          <div className="legend-item">
            <span className="seat available"></span> Ghế có sẵn
          </div>
          <div className="legend-item">
            <span className="seat booked"></span> Ghế đã đặt
          </div>
          <div className="legend-item">
            <span className="seat selected"></span> Ghế đang chọn
          </div>
        </div>
      </div>

      <div className="seatmap-wrapper relative">
        <div
          className="seatmap-zoom"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
            transition: "transform 0.2s ease-in-out"
          }}
        >
          <svg viewBox={seatMap.viewBox} className="seatmap">
            {stageSections?.map((section) => (
              <g key={section.id}>
                {section.element?.map((el, index) => (
                  <path
                    key={index}
                    d={el.data}
                    fill={el.fill}
                    transform={`translate(${el.x}, ${el.y})`}
                  />
                ))}
              </g>
            ))}

            {normalSections?.map((section) => (
              <g key={section.id}>
                {section.element?.map((el, index) => (
                  <path
                    key={index}
                    d={el.data}
                    fill={el.fill}
                    transform={`translate(${el.x}, ${el.y})`}
                  />
                ))}

                {section.Row?.map((row) =>
                  row.Seat.map((seat) => {
                    const isSelected = selectedSeats.has(seat.id);
                    const fillColor =
                      seat.status === 2 ? "red" : isSelected ? "#6FEC61" : "gray"; // Đã đặt: đỏ, đang chọn: xanh lá, còn lại: xám

                    const seatNumber = parseInt(seat.name, 10);
                    let labelOffsetX = 0;
                    if (!isNaN(seatNumber)) {
                      labelOffsetX = seatNumber % 2 === 0 ? 10 : -10;
                    }

                    const labelOffsetY = 5;

                    return (
                      <g key={seat.id}>
                        <circle
                          cx={typeof seat.positionX === "number" ? seat.positionX : seat.positionX[0] ?? 0}
                          cy={typeof seat.positionY === "number" ? seat.positionY : seat.positionY[0] ?? 0}
                          r={4}
                          stroke="#000"
                          strokeWidth={1}
                          fill={fillColor}
                          onClick={() => handleSeatClick(seat, section.ticketTypeId ?? "", seat.status)}
                          style={{ cursor: seat.status === 2 ? "not-allowed" : "pointer" }}
                        />
                        {zoom >= 1.5 && (
                          <text
                            x={(typeof seat.positionX === "number" ? seat.positionX : seat.positionX[0] ?? 0) + labelOffsetX}
                            y={(typeof seat.positionY === "number" ? seat.positionY : seat.positionY[0] ?? 0) + labelOffsetY}
                            fontSize={4}
                            fill="#000"
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            {seat.name}
                          </text>
                        )}
                      </g>
                    );
                  })
                )}
              </g>
            ))}
          </svg>
        </div>

        <div className="selected-seats absolute bottom-0 left-0 w-full text-center text-sm font-bold bg-white bg-opacity-80 p-1">
          Vị trí đã chọn: {selectedSeatLabels.join(", ")}
        </div>
      </div>

      <AlertDialog
        message={alertMessage}
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default SeatMapComponent;