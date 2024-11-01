import { useParams } from "react-router-dom";
import { useGetRoomQuery } from "./roomSlice";
import "./rooms.css";

export default function RoomDetail() {
  const { roomId } = useParams();
  const { data: room, isLoading, error } = useGetRoomQuery(roomId);
  if (isLoading) return <p>Loading room...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className="RoomDetail">
        <h1>{room.roomName}</h1>
        <p>{room.type}</p>
        <p>Price: ${room.price}</p>
        <figure>
          <img src={room.image} alt={room.roomName} />
        </figure>
      </div>
    </>
  );
}
