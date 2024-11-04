import { useNavigate } from "react-router-dom";
import { useAddBookingMutation } from "./roomSlice";
import { useParams } from "react-router-dom";
import { useGetRoomQuery } from "./roomSlice";
import "./rooms.css";

export default function RoomDetail() {
  const { roomId } = useParams();
  const { data: room, isLoading, error } = useGetRoomQuery(roomId);
  if (isLoading) return <p>Loading room...</p>;
  if (error) return <p>{error.message}</p>;

  const navigate = useNavigate();
  const [addBooking] = useAddBookingMutation();
  async function postBooking(event) {
    event.preventDefault();
    try {
      const bookingRoom = await addBooking({
        ...formData,
      }).unwrap();
      navigate(`/bookings`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div className="roomDetailPage">
        <div className="RoomDetail">
          <h1>{room.roomName}</h1>
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
    </>
  );
}
