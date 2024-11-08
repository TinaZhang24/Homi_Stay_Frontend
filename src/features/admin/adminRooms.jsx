import { useGetRoomsQuery } from "./adminSlice";

export default function AdminRooms() {
  const { data: rooms = [], isLoading, error } = useGetRoomsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>error fetching rooms</p>;
  return (
    <>
      <div className="row">
        <h1>Rooms</h1>
        <table className="adminRooms">
          <thead>
            <tr>
              <th>Room Id</th>
              <th>RoomName</th>
              <th>Email</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Type</th>
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
                  <td>{room.image}</td>
                  <td>{room.booking}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
