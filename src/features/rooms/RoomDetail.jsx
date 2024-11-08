import { useNavigate, useParams } from "react-router-dom";
import { useAddBookingMutation, useGetRoomQuery } from "./roomSlice";
import { useState } from "react";
import "./rooms.css";

export default function RoomDetail() {
  const { roomId } = useParams();
  const { data: room, isLoading, error } = useGetRoomQuery(roomId);
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
  });

  const navigate = useNavigate();
  const [addBooking] = useAddBookingMutation();
  async function postBooking(event) {
    event.preventDefault();
    try {
      const bookingRoom = await addBooking({
        ...formData,
        roomId,
      }).unwrap();
      navigate(`/bookings`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {isLoading && <p>Loading Room...</p>}
      {error && <p>{error.message}</p>}
      {room && (
        <div className="roomDetailPage">
          <div className="RoomDetail">
            <h1>Room Name: {room.roomName}</h1>
            <p>{room.type}</p>
            <p>Price: ${room.price}</p>
            <figure>
              <img src={room.image} alt={room.roomName} />
            </figure>
          </div>
          <div className="RoomReserve">
            <h1>Book Now</h1>
            <form className="bookingConfirm" onSubmit={postBooking}>
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
                  onChange={(e) =>
                    setFormData({ ...formData, toDate: e.target.value })
                  }
                />
              </label>
              <button>Confirm</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
