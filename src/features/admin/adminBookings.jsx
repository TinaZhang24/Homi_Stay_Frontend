import { useGetBookingsQuery } from "./adminSlice";

export default function AdminBookings() {
  const { data: bookings = [], isLoading, error } = useGetBookingsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>error fetching bookings</p>;
  return (
    <>
      <div className="row">
        <h1>Bookings</h1>
        <table className="adminBookings">
          <thead>
            <tr>
              <th>Booking Id</th>
              <th>Checkin Date</th>
              <th>Checkout Date</th>
              <th>User</th>
              <th>Room</th>
              {/* <th>Review</th> */}
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings.map((booking) => (
                <tr>
                  <td>{booking.id}</td>
                  <td>{booking.fromDate}</td>
                  <td>{booking.toDate}</td>
                  <td>{booking.userId}</td>
                  <td>{booking.roomId}</td>
                  {/* <td>{booking.review}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
