import { Link } from "react-router-dom";
import { useGetUsersQuery } from "./adminSlice";
import { useState } from "react";
import "./admin.css";

export default function AdminUsersComp() {
  const { data: users = [], isLoading, error } = useGetUsersQuery();
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
        <div className="userTable">
          <table className="adminUsers">
            <thead>
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>is Admin</th>
                <th>Booking</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users?.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                    <td>
                      {user.booking?.map((booking) => (
                        <span>{booking.id} </span>
                      ))}
                    </td>
                    <td>
                      <Link to={`/admin/users/${user.id}`}>Delete</Link>
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
