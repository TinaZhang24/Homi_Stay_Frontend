import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAvailableRoomsQuery } from "./roomSlice";

export default function AvailabilityForm({ setAvailableRooms }) {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
  });
  const navigate = useNavigate();
  const [triggerSearch, setTriggerSearch] = useState(false);
  const {
    data: rooms,
    isLoading,
    error,
  } = useGetAvailableRoomsQuery(formData, { skip: !triggerSearch });
  console.log(rooms);
  async function getAvailability(event) {
    event.preventDefault();
    // const start = new Date(formData.fromDate);
    // const end = new Date(formData.toDate);
    try {
      setTriggerSearch(true);
      setAvailableRooms(rooms);
      // navigate(`/rooms/available?fromDate=${fromDate}&toDate=${toDate}`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form onSubmit={getAvailability}>
      <label>
        Check-in Date
        <input
          type="date"
          id="fromDate"
          name="trip-start"
          value={formData.fromDate}
          onChange={(e) =>
            setFormData({ ...formData, fromDate: e.target.value })
          }
        />
      </label>
      <label>
        Check-out Date
        <input
          type="date"
          id="toDate"
          name="trip-end"
          value={formData.toDate}
          onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
        />
      </label>
      <button>Search</button>
    </form>
  );
}
