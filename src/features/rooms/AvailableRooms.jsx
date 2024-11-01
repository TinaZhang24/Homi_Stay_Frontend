import { useGetAvailableRoomsQuery } from "./roomSlice";
import "./rooms.css";

export default function AvailableRooms() {
  const { data: rooms = [] } = useGetAvailableRoomsQuery();

  var url = window.location.pathname;
  var getQuery = url.split("?")[1];
  var fromDate = getQuery.split("&")[0];
  var toDate = getQuery.split("&")[1];

  return (
    <>
      <ul className="AvailableRooms">
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
    </>
  );
}
