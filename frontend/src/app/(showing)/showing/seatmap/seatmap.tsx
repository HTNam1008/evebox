"use client";

/* Package System */
import React, { useState } from "react";
import { SeatMap } from "@/types/model/seatmap";

/* Package Application */
import "@/../public/styles/showing/seatmap.css";

interface SeatMapProps {
  seatMap: SeatMap;
}

const SeatMapComponent: React.FC<SeatMapProps> = ({ seatMap }) => {
  const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set());
  const [zoom, setZoom] = useState<number>(1);

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

  const handleSeatClick = (seatId: number, status: number) => {
    if (status === 2) return;

    setSelectedSeats((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(seatId)) {
        newSelected.delete(seatId);
      } else {
        newSelected.add(seatId);
      }
      return newSelected;
    });
  }

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

  return (
    <div className="seatmap-container relative overflow-hidden" onWheelCapture={handleWheel}>
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
            {seatMap?.Section?.map((section) => (
              <g key={section.id}>
                {section.element?.map((el, index) => (
                  <path key={index} d={el.data} fill={el.fill} transform={`translate(${el.x}, ${el.y})`} />
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
                          onClick={() => handleSeatClick(seat.id, seat.status)}
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
    </div>
  );
};

export default SeatMapComponent;