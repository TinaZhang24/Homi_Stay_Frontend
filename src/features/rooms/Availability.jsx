import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAvailableRooms, update } from "./availabilitySlice";

// Allow users to update available rooms based on their filters.
export default function Availability() {
  const availableRooms = useSelector(selectAvailableRooms);
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");

  const dispatch = useDispatch();

  /** Dispatches an availabilty action based on the form submission. */
  const onAvailability = (e) => {
    e.preventDefault();
    dispatch(update({ checkinDate, checkoutDate }));

    return (
      <>
        <form onSubmit={onAvailability}>
          <label>
            Check-in Date
            <input
              type="date"
              id="checkinDate"
              name="checkinDate"
              value={checkinDate}
              onChange={(e) => setCheckinDate(e.target.value)}
            />
          </label>
          <label>
            Check-out Date
            <input
              type="date"
              id="checkoutDate"
              name="checkoutDate"
              value={checkoutDate}
              onChange={(e) => setCheckoutDate(e.target.value)}
            />
          </label>
          <button name="update">Search</button>
        </form>
        <h2>Available Rooms:</h2>
        <article>${availableRooms}</article>
      </>
    );
  };
}
