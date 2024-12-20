import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeleteUserMutation, useGetUserQuery } from "./adminSlice";
import "./admin.css";

export default function UserDelete() {
  const { userId } = useParams();
  const { data: user, isLoading, error } = useGetUserQuery(userId);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

  async function removeUser() {
    if (!token) {
      console.error("No token found");
      return;
    }
    if (!user) {
      console.log("No user found");
      return;
    }
    try {
      await deleteUser(user.id);
      navigate("/admin/users");
    } catch (e) {
      console.error(e);
    }
  }

  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className="userDetail">
        <h1>{user.id}</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>isAdmin: {user.isAdmin ? "YES" : "NO"}</p>
        <p>
          {user.booking?.map((booking) => (
            <span>{booking.id} </span>
          ))}
        </p>
        <button className="btn" onClick={removeUser}>
          Confirm Delete
        </button>
      </div>
    </>
  );
}
