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

  return (
    <div className="seatmap-container">
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

                return (
                  <circle
                    key={seat.id}
                    cx={seat.positionX[0] ?? 0}
                    cy={seat.positionY[0] ?? 0}
                    r={4}
                    stroke="#000"
                    strokeWidth={1}
                    fill={fillColor}
                    onClick={() => handleSeatClick(seat.id, seat.status)}
                    style={{ cursor: seat.status === 2 ? "not-allowed" : "pointer" }}
                  />
                );
              })
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default SeatMapComponent;