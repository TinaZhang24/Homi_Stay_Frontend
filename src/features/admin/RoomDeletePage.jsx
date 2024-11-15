import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeleteAdminRoomMutation, useGetAdminRoomQuery } from "./adminSlice";
import "./admin.css";

export default function RoomDelete() {
  const { roomId } = useParams();
  const { data: room, isLoading, error } = useGetAdminRoomQuery(roomId);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [deleteRoom] = useDeleteAdminRoomMutation();

  async function removeRoom() {
    if (!token) {
      console.error("No token found");
      return;
    }
    if (!room) {
      console.log("No room found");
      return;
    }
    try {
      await deleteRoom(room.id);
      navigate("/admin/rooms");
    } catch (e) {
      console.error(e);
    }
  }

  if (isLoading) return <p>Loading room...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className="roomDetail">
        <h1>{room.id}</h1>
        <p>Room Name: {room.roomName}</p>
        <p>Description: {room.description}</p>
        <p>Price: {room.price}</p>
        <p>Image: {room.image}</p>
        <p>Type: {room.type}</p>
        <p>
          {room.booking?.map((booking) => (
            <span>{booking.id} </span>
          ))}
        </p>
        <button className="btn" onClick={removeRoom}>
          Confirm Delete
        </button>
      </div>
    </>
  );
}
