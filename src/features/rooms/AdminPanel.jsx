// import { useState, useEffect } from "react";

// const AdminPanel = () => {
//   const [users, setUsers] = useState([]);

//   const getAllUsers = async () => {
//     const token = sessionStorage.getItem("token");
//     const response = await fetch("/admin/users", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `BEARER ${token}`,
//       },
//     });
//     const result = response.json();
//     console.log(result);
//     setUsers(result);
//   };

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   return (
//     <>
//       <div>
//         <h2>All users</h2>
//       </div>
//     </>
//   );
// };

// export default AdminPanel;
