import React, { useEffect, useState } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetAllBookingsQuery,
  useDeleteBookingMutation,
  useGetAllRoomsQuery,
  useDeleteRoomMutation,
} from '../admin/adminSlice';
import { useSelector } from "react-redux";

const AdminPanel = () => {
  // Get token from Redux state
  const token = useSelector((state) => state.auth.token);
  console.log("Token before making admin request:", token);

  // State to store fetched data
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  // Fetch users, bookings, and rooms using RTK Query hooks
  const usersQuery = useGetAllUsersQuery();
  const bookingsQuery = useGetAllBookingsQuery();
  const roomsQuery = useGetAllRoomsQuery();

  // Mutations to delete users, bookings, and rooms
  const [deleteUser] = useDeleteUserMutation();
  const [deleteBooking] = useDeleteBookingMutation();
  const [deleteRoom] = useDeleteRoomMutation();

  // Fetch data once on component mount
  useEffect(() => {
    if (usersQuery.data) {
      setUsers(usersQuery.data);
    }
    if (bookingsQuery.data) {
      setBookings(bookingsQuery.data);
    }
    if (roomsQuery.data) {
      setRooms(roomsQuery.data);
    }
  }, [rooms]);

  // Handler functions for deleting users, bookings, and rooms
  const handleDeleteUser = async (id) => {
    try {
      console.log("Deleting user with ID:", id);
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Failed to delete user: ", err);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      console.log("Deleting booking with ID:", id);
      await deleteBooking(id);
      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (err) {
      console.error("Failed to delete booking: ", err);
    }
  };
  
  const handleDeleteRoom = async (id) => {
    try {
      console.log("Deleting room with ID:", id);
      await deleteRoom(id);
      setRooms(rooms.filter((room) => room.id !== id));
    } catch (err) {
      console.error("Failed to delete room: ", err);
    }
  };
  
  // if (usersQuery.isLoading || bookingsQuery.isLoading || roomsQuery.isLoading) {
    //   return <p>Loading...</p>;
    // }
    
    // if (usersQuery.error || bookingsQuery.error || roomsQuery.error) {
      //   return <p>Error: {(usersQuery.error || bookingsQuery.error || roomsQuery.error).message}</p>;
      // }
      
      return (
        <div>
      <h2>All Users</h2>
      <ul>
        {users && (
          
          users.map((user) => (
            <li key={user.name}>
            {user.name}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
            )
        ))}
        </ul>
        
        <h2>All Bookings</h2>
        <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            Booking ID: {booking.id}
            <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
          </li>
        ))}
      </ul>

<h2>All Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            Room ID: {room.id}, Name: {room.name}
            <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
