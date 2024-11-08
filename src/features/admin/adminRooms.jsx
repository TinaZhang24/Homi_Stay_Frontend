import { useGetRoomsQuery } from "./adminSlice";

export default function AdminRooms() {
  const { data: rooms = [], isLoading, error } = useGetRoomsQuery();
  if (isLoading) return <p className="status">Loading...</p>;
  if (error) return <p className="status">error fetching rooms</p>;
  return (
    <>
      <div className="roomTable">
        <table className="adminRooms">
          <thead>
            <tr>
              <th>Room Id</th>
              <th>RoomName</th>
              <th>Description</th>
              <th>Price</th>
              <th>Type</th>
              <th>Image</th>
              <th>Booking</th>
            </tr>
          </thead>
          <tbody>
            {rooms &&
              rooms.map((room) => (
                <tr>
                  <td>{room.id}</td>
                  <td>{room.roomName}</td>
                  <td>{room.description}</td>
                  <td>{room.price}</td>
                  <td>{room.type}</td>
                  <figure>
                    <img src={room.image} alt={room.roomName} />
                  </figure>
                  <td>{room.bookingId}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
