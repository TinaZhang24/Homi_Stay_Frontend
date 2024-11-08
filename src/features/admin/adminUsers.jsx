import { Link } from "react-router-dom";
import { useGetUsersQuery } from "./adminSlice";
import "./admin.css";

export default function AdminUsers() {
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  if (isLoading) return <p className="status">Loading...</p>;
  if (error)
    return (
      <p className="status">
        You must log in as an admin to checkout this page.
      </p>
    );
  return (
    <>
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
    </>
  );
}
