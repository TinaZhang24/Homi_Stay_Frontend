export default function AdminPage() {
  return (
    <>
      <p>
        <Link to={`/users`}>Users</Link>
      </p>
      <p>
        <Link to={`/bookings`}>Bookings</Link>
      </p>
      <p>
        <Link to={`/rooms`}>Rooms</Link>
      </p>
    </>
  );
}
