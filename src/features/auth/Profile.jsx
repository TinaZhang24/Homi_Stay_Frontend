import Bookings from "../rooms/bookings";
import { useGetUserQuery } from "./authSlice";

/** User profile page with a list of their bookings */
function UserBookings() {
  const { data: user, isLoading, error } = useGetUserQuery();

  if (error) return <p>Please log in to see your booking details.</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="UserBookings">
      <h1>{user}'s Bookings</h1>
      <Bookings />
    </main>
  );
}

export default UserBookings;
