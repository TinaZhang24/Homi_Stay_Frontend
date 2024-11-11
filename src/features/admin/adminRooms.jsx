import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetAdminRoomsQuery, useAddAdminRoomMutation } from "./adminSlice";
import { useState } from "react";
import "./admin.css";

export default function AdminRooms() {
  /** Get rooms */
  const { data: rooms = [], isLoading, error } = useGetAdminRoomsQuery();

  /** Add a new room */
  const [formData, setFormData] = useState({
    roomName: "",
    description: "",
    price: "",
    image: "",
    type: "",
  });

  const navigate = useNavigate();
  const [addRoom] = useAddAdminRoomMutation();
  async function postRoom(event) {
    event.preventDefault();
    try {
      const Room = await addRoom({
        ...formData,
      }).unwrap();
      navigate(`/rooms`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {isLoading && <p className="status">Loading...</p>}
      {error && (
        <p className="status">
          You must log in as an admin to checkout this page.
        </p>
      )}
      {rooms && (
        <div>
          <div className="addRoom">
            <form className="postRoom" onSubmit={postRoom}>
              <label>
                Room Name
                <br />
                <input
                  type="text"
                  class="inputbox"
                  id="roomName"
                  name="room-name"
                  value={formData.roomName}
                  onChange={(e) =>
                    setFormData({ ...formData, roomName: e.target.value })
                  }
                />
              </label>
              <label>
                Description
                <br />
                <textarea
                  type="text"
                  class="inputbox"
                  id="desc"
                  name="room-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </label>
              <label>
                Price
                <br />
                <input
                  type="number"
                  class="inputbox"
                  id="price"
                  name="room-price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </label>
              <label>
                Image URL
                <br />
                <input
                  type="text"
                  class="inputbox"
                  id="imageURL"
                  name="room-image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </label>
              <label>
                Type
                <br />
                <input
                  type="text"
                  class="inputbox"
                  id="type"
                  name="room-type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                />
              </label>
              <button className="btn">Add Room</button>
            </form>
          </div>
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
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {rooms &&
                  rooms?.map((room) => (
                    <tr>
                      <td>{room.id}</td>
                      <td>{room.roomName}</td>
                      <td>{room.description}</td>
                      <td>${room.price}</td>
                      <td>{room.type}</td>
                      <figure>
                        <img src={room.image} alt={room.roomName} />
                      </figure>
                      <td>
                        {room.booking?.map((booking) => (
                          <span>{booking.id} </span>
                        ))}
                      </td>
                      <td>
                        <Link to={`/admin/rooms/${room.id}`}>Delete</Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
