import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetAdminBookingQuery,
  useDeleteAdminBookingMutation,
} from "./adminSlice";
import "./admin.css";

export default function BookingDelete() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    error,
  } = useGetAdminBookingQuery(bookingId);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [deleteBooking] = useDeleteAdminBookingMutation();

  async function removeBooking() {
    if (!token) {
      console.error("No token found");
      return;
    }
    if (!booking) {
      console.log("No booking found");
      return;
    }
    try {
      await deleteBooking(booking.id);
      navigate("/admin/bookings");
    } catch (e) {
      console.error(e);
    }
  }

  if (isLoading) return <p>Loading booking...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className="bookingDetail">
        <h1>{booking.id}</h1>
        <p>Checkin Date: {new Date(booking.fromDate).toLocaleDateString()}</p>
        <p>Checkout Date: {new Date(booking.toDate).toLocaleDateString()}</p>
        <p>User: {booking.userId}</p>
        <p>Room: {booking.roomId}</p>
        <button className="btn" onClick={removeBooking}>
          Confirm Delete
        </button>
      </div>
    </>
  );
}
