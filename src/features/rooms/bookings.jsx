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
          {bookings.map((booking) => (
            <Booking key={booking.id} booking={booking} />
          ))}
        </ul>
      ) : (
        <p>{"You don't have any bookings yet!"}</p>
      )}
    </>
  );
}

function Booking({ booking }) {
  const [cancelBooking, { cancelIsLoading }] = useCancelBookingMutation();
  const tryCancelBooking = (event) => {
    event.preventDefault();
    cancelBooking(booking.id);
  };

  const checkin = new Date(booking.fromDate).toLocaleDateString();
  const checkout = new Date(booking.toDate).toLocaleDateString();

  return (
    <li>
      <p className="id">Booking ID: {booking.id}</p>
      <p className="checkin">Check-in Date: {checkin}</p>
      <p className="checkout">Check-out Date: {checkout}</p>
      <p className="roomName">Room Name: {booking.room.roomName}</p>
      <p className="desc">Description: {booking.room.description}</p>
      <p className="price">Price: ${booking.room.price}</p>
      <p className="type">{booking.room.type}</p>
      <figure>
        <img src={booking.room.image} alt={booking.room.roomName} />
      </figure>
      <form onSubmit={tryCancelBooking}>
        <button>{cancelIsLoading ? "Cancelling..." : "Cancel Booking"}</button>
      </form>
    </li>
  );
}
