import { NavLink } from "react-router-dom";
import "./admin.css";

export default function AdminPageComp() {
  return (
    <>
      <div className="adminNavbar">
        <menu>
          <li>
            <button className="btn">
              <NavLink to={`/admin/users`}> Users </NavLink>
            </button>
          </li>
          <li>
            <button className="btn">
              <NavLink to={`/admin/bookings`}> Bookings </NavLink>
            </button>
          </li>
          <li>
            <button className="btn">
              <NavLink to={`/admin/rooms`}> Rooms </NavLink>
            </button>
          </li>
        </menu>
      </div>
    </>
  );
}
