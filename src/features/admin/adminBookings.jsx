import { Link } from "react-router-dom";
import { useGetAdminBookingsQuery } from "./adminSlice";
import "./admin.css";

export default function AdminBookings() {
  const { data: bookings = [], isLoading, error } = useGetAdminBookingsQuery();
  if (isLoading) return <p className="status">Loading...</p>;
  if (error)
    return (
      <p className="status">
        You must log in as an admin to checkout this page.
      </p>
    );
  return (
    <>
      <div className="bookingTable">
        <table className="adminBookings">
          <thead>
            <tr>
              <th>Booking Id</th>
              <th>Checkin Date</th>
              <th>Checkout Date</th>
              <th>User</th>
              <th>Room</th>
              <th>Delete</th>
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
                  <td>
                    <Link to={`/admin/bookings/${booking.id}`}>Delete</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
