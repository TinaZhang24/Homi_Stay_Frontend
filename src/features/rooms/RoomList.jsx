import { Link } from "react-router-dom";

import { useGetRoomsQuery } from "./roomSlice";

import "./rooms.css";

export default function RoomList() {
  const { data: rooms = [] } = useGetRoomsQuery();

  return (
    <>
      {/* <div className="ListofRooms"> */}
      <ul className="ListofRooms">
        {rooms.map((r) => (
          <li key={r.id}>
            <figure>
              <img src={r.image} alt={r.roomName} />
            </figure>
            <h3>{r.roomName}</h3>
            <h3>{r.type}</h3>
            <button>See Details</button>
            <button>See Reviews</button>
            {/* <Link to={`/rooms/${r.id}`}>See details</Link> */}
          </li>
        ))}
      </ul>
      {/* </div> */}
    </>
  );
}
