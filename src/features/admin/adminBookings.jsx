import { Link } from "react-router-dom";
import { useGetAdminBookingsQuery } from "./adminSlice";
import { useState } from "react";
import "./admin.css";

export default function AdminBookings() {
  const { data: bookings = [], isLoading, error } = useGetAdminBookingsQuery();
  /** Grab isAdmin value from local storage */
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(sessionStorage.getItem("isAdmin"))
  );
  return (
    <>
      {isLoading && <p className="status">Loading...</p>}
      {error && (
        <p className="status">You must be logged in as an administrator.</p>
      )}
      {isAdmin && (
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
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{new Date(booking.fromDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.toDate).toLocaleDateString()}</td>
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
      )}
    </>
  );
}
