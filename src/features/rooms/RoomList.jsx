import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetRoomsQuery } from "./roomSlice";
import AvailabilityForm from "./AvailabilyForm";

import "./rooms.css";

export default function RoomList() {
  //   const { data: rooms = [] } = useGetAvailableRoomsQuery();
  const { data: rooms = [] } = useGetRoomsQuery();
  const [availableRooms, setAvailableRooms] = useState([]);
  console.log(availableRooms);
  return (
    <>
      <div className="Rooms">
        <div className="AvailabilityForm">
          <AvailabilityForm setAvailableRooms={setAvailableRooms} />
        </div>
        <div className="ListofRooms">
          <ul>
            {rooms.length > 0 &&
              rooms.map((room) => (
                <li key={room.id}>
                  <figure>
                    <img src={room.image} alt={room.roomName} />
                  </figure>
                  <h3>{room.roomName}</h3>
                  <h3>{room.type}</h3>
                  <p>
                    <Link to={`/rooms/${room.id}`}>See Details</Link>
                  </p>
                  <p>
                    <button>See Reviews</button>
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
