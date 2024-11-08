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
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                  <td>{user.bookingId}</td>
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

// import { useGetUsersQuery, useDeleteUserMutation } from "./adminSlice";
// import "./admin.css";

/** Displays a list of users , deletes a user*/
// export default function Users() {
//   const { data: users = [], isLoading, error } = useGetUsersQuery();
//   if (isLoading) return <p className="status">Loading...</p>;
//   if (error)
//     return (
//       <p className="status">
//         You must log in as an admin to checkout this page.
//       </p>
//     );

//   return (
//     <>
//       <ul className="userTable">
//         <table className="adminUsers">
//           <thead>
//             <tr>
//               <th>User Id</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>is Admin</th>
//               <th>Booking</th>
//               <th>To delete</th>
//             </tr>
//           </thead>
//         </table>
//         {users.map((user) => (
//           <User key={user.id} user={user} />
//         ))}
//       </ul>
//     </>
//   );
// }

// function User({ user }) {
//   const [deleteUser, { isLoading }] = useDeleteUserMutation();
//   const tryDeleteUser = (event) => {
//     event.preventDefault();
//     deleteUser(user.id);
//   };

//   return (
//     <>
//       <div className="userTable">
//         <table className="adminUsers">
//           <tbody>
//             <tr>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.isAdmin ? "YES" : "NO"}</td>
//               <td>{user.bookingId}</td>
//               <td>
//                 <form onSubmit={tryDeleteUser}>
//                   <button>{isLoading ? "Deleting..." : "Delete"}</button>
//                 </form>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }
