import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetRoomsQuery } from "./roomSlice";
import AvailabilityForm from "./AvailabilyForm";
import "./rooms.css";

export default function RoomList() {
  const { error, isLoading } = useGetRoomsQuery();
  /** Access the rooms state(created in roomSlice) using useSelector. */
  const rooms = useSelector((state) => state.rooms.rooms);

  if (isLoading) {
    return <p>is Loading ...</p>;
  }
  if (error) {
    return <p>error fetching rooms ...</p>;
  }

  return (
    <>
      <div>
        <div className="AvailabilityForm">
          <AvailabilityForm />
          <p>{rooms.length && `${rooms.length} results`} </p>
        </div>
        <div>
          <ul className="grid">
            {rooms.length > 0 &&
              rooms.map((room) => (
                <li className="card" key={room.id}>
                  <figure className="card-header">
                    <img
                      className="card-image"
                      src={room.image}
                      alt={room.roomName}
                    />
                  </figure>
                  <h3>{room.roomName}</h3>
                  <h3>{room.type}</h3>
                  <button className="btn" id="viewMore">
                    <Link to={`/rooms/${room.id}`}>View More</Link>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
