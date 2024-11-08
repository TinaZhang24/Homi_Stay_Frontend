import { useGetUsersQuery } from "./adminSlice";

export default function AdminUsers() {
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  console.log(users);
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>error fetching users</p>;
  return (
    <>
      <div className="row">
        <h1>Users</h1>
        <table className="adminUsers">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Booking</th> */}
              <th>is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.users.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
