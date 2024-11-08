import { NavLink } from "react-router-dom";

export default function AdminPage() {
  return (
    <>
      <div className="adminNavbar">
        <ul>
          <li>
            <NavLink to={`/admin/users`}>Users</NavLink>
          </li>
          <li>
            <NavLink to={`/admin/bookings`}>Bookings</NavLink>
          </li>
          <li>
            <NavLink to={`/admin/rooms`}>Rooms</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
