"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import SeatMap from "./components/seatmap";
import { SeatMap as SeatMapType } from "./components/seatmapType";

const TempPage: React.FC = () => {
  const [seatMapData, setSeatMapData] = useState<SeatMapType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showingIdList, setShowingIdList] = useState<string[]>([]);
  const [selectedShowingId, setSelectedShowingId] = useState<string>("");
  useEffect(() => {
    const fetchShowingIdList = async () => {
      try {
        const result = await axios.get("http://localhost:3001/api/showing/all-showings");
        setShowingIdList(result.data.data); // Lưu dữ liệu vào state
        console.log("Showing ID list:", result.data.data);
      } catch (error) {
        console.error("Error fetching showing ID list:", error);
      }
    };

    fetchShowingIdList();
  }, []); // Chỉ chạy 1 lần khi component mount
  useEffect(() => {
    const fetchSeatMap = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/api/showing/seatmap?showingId=${selectedShowingId}`);
        setSeatMapData(result.data.data); // Lưu dữ liệu vào state
        console.log("Seat map data:", result.data.data);
      } catch (error) {
        console.error("Error fetching seat map data:", error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchSeatMap();
  }, [selectedShowingId]); // Chỉ chạy 1 lần khi component mount

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Seat Map</h1>
      <select onChange={(e) => setSelectedShowingId(e.target.value)}>
        {showingIdList.map((showingId) => (
          <option key={showingId} value={showingId} selected={showingId === selectedShowingId}>
            {showingId}
          </option>
        ))}
      </select>
      {seatMapData && <SeatMap seatMap={seatMapData} />}
    </div>
  );
};

export default TempPage;
