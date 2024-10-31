import { Link } from "react-router-dom";

import { useGetRoomsQuery } from "./roomSlice";

import "./rooms.css";

export default function RoomList() {
  const { data: rooms = [] } = useGetRoomsQuery();

  return (
    <>
      <ul className="ListofRooms">
        {rooms.length > 0 &&
          rooms.map((room) => (
            <li key={room.id}>
              <figure>
                <img src={room.image} alt={room.roomName} />
              </figure>
              <h3>{room.roomName}</h3>
              <h3>{room.type}</h3>
              <button>See Reviews</button>
            </li>
          ))}
      </ul>
    </>
  );
}
