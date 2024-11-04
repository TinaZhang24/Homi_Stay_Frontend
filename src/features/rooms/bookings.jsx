import { useGetBookingsQuery, useCancelBookingMutation } from "./roomSlice";

/** Displays a list of bookings that a logged in user has made , cancels a booking*/
export default function Bookings() {
  const { data: bookings = [] } = useGetBookingsQuery();

  if (!bookings) return <p>Loading...</p>;

  return (
    <>
      <h1>Bookings</h1>
      {bookings.length ? (
        <ul className="bookings">
          {bookings.map((room) => (
            <Booking key={room.id} room={room} />
          ))}
        </ul>
      ) : (
        <p>{"You don't have any bookings yet!"}</p>
      )}
    </>
  );
}

function Booking({ room }) {
  const [cancelBooking, { isLoading }] = useCancelBookingMutation();

  const tryCancelBooking = (event) => {
    event.preventDefault();
    cancelBooking(room.id);
  };

  return (
    <li>
      <span className="id">{room.id}</span>
      <span className="roomName">{room.roomName}</span>
      <span className="type">{room.type}</span>
      <span className="price">{room.price}</span>
      <figure>
        <img src={room.image} alt={room.roomName} />
      </figure>
      <form onSubmit={tryCancelBooking}>
        <button>{isLoading ? "Cancelling..." : "Cancel Booking"}</button>
      </form>
    </li>
  );
}
