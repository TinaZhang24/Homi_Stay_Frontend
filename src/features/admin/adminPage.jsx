import { NavLink } from "react-router-dom";

export default function AdminPage() {
  return (
    <>
      <p>
        <NavLink to={`/admin/users`}>Users</NavLink>
      </p>
      <p>
        <NavLink to={`/admin/bookings`}>Bookings</NavLink>
      </p>
      <p>
        <NavLink to={`/admin/rooms`}>Rooms</NavLink>
      </p>
    </>
  );
}
