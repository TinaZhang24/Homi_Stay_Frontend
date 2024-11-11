import { useState } from "react";

import { useGetAvailableRoomsQuery } from "./roomSlice";

export default function AvailabilityForm() {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
  });

  const [triggerSearch, setTriggerSearch] = useState(false);
  const { isLoading, error } = useGetAvailableRoomsQuery(formData, {
    skip: !triggerSearch,
  });

  async function getAvailability(event) {
    event.preventDefault();

    setTriggerSearch(true);
  }

  if (isLoading) {
    return <h1>is Loading ...</h1>;
  }
  if (error) {
    return <p>error fetching rooms ...</p>;
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
      <button className="btn">Search</button>
    </form>
  );
}
