import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetRoomsQuery } from "./roomSlice";
import AvailabilityForm from "./AvailabilyForm";

export default function RoomList() {
  const { error, isLoading } = useGetRoomsQuery();
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
