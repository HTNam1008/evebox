import React from "react";
import { SeatMap as SeatMapType, Section, Row, Seat } from "./seatmapType";

interface SeatMapProps {
  seatMap: SeatMapType;
}

const SeatMap: React.FC<SeatMapProps> = ({ seatMap }) => {
  if (!seatMap) return <p>No seat map available</p>;
  return (
    <svg
      width="1200"
      height="1200"
      viewBox={seatMap.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {seatMap.Section.map((section: Section) => (
        <g key={section.id}>
          {/* Render Section Elements */}
          {section.element &&
            Array.isArray(section.element) &&
            section.element.map((element, index) => {
              if (element && element.type === "path") {
                return (
                  <path
                    key={index}
                    d={element.data}
                    fill={element.fill}
                    transform={`translate(${element.x}, ${element.y})`}
                  />
                );
              }
              return null;
            })}

          {/* Render Rows and Seats */}
          {section.Row &&
            section.Row.map((row: Row) => (
              <g key={row.id}>
                {/* Render Seats */}
                {row.Seat.map((seat: Seat) => (
                  <circle
                    key={seat.id}
                    cx={seat.positionX[0]}
                    cy={seat.positionY[0]}
                    r={5} // Kích thước ghế (bán kính)
                    fill={ seat.status === 1 ? "#00f" : "#f00"} // Màu ghế
                    stroke="#000" // Viền ghế
                    strokeWidth={1}
                  >
                    <title>{`${row.name}-${seat.name}`}</title>
                  </circle>
                ))}
              </g>
            ))}
        </g>
      ))}
    </svg>
  );
};

export default SeatMap;
