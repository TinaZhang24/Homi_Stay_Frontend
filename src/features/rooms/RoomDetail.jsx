import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetRoomQuery } from "./roomSlice";
import "./rooms.css";
import { useState } from "react";

export default function RoomDetail() {
  const { roomId } = useParams();
  const { data: room, isLoading, error } = useGetRoomQuery(roomId);

  //   const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  if (isLoading) return <p>Loading room...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className="RoomDetail">
        <h1>{room.name}</h1>
        <p>Type:{room.type}</p>
        <p>{room.description}</p>
        <p>Price: ${room.price}</p>
        <p>{room.image}</p>
      </div>
    </>
  );
}
