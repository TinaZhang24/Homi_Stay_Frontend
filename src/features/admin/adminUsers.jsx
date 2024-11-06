export default function AdminUsers() {
  const { data: users = [] } = useGetUsersQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>error fetching users</p>;
  return (
    <>
      <div className="row">
        <h1>Users</h1>
        <table className="adminUsers">
          <thread>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Booking</th>
              <th>is Admin</th>
            </tr>
          </thread>
          <tbody>
            {users &&
              users.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
