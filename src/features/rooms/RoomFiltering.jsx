import React, { useEffect, useState } from "react";
import axios from "axios";
// import Room from "../components/Room.js";
import moment from "moment";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function RoomFilter() {
  // State variables
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(); // Initialize to false
  const [error, setError] = useState(); // Initialize to false
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);

  // Fetch room data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        const response = await axios.get("/api/rooms/getallrooms");

        const data = response.data;

        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false); // Set loading back to false after fetching
      } catch (error) {
        setError(true); // Set error to true in case of an error
        console.log(error);
        setLoading(false); // Set loading back to false
      }
    };

    fetchData(); // Call the async function to fetch data
  }, []);

  //Function to handle date range filtering
  function filterByDate(dates) {
    if (dates && dates.length === 2) {
      const checkInDateObj = new Date(dates[0]);
      const checkOutDateObj = new Date(dates[1]);

      const checkInFormatted = moment(checkInDateObj).format("DD-MM-YYYY");
      const checkOutFormatted = moment(checkOutDateObj).format("DD-MM-YYYY");

      setCheckInDate(checkInFormatted);
      setCheckOutDate(checkOutFormatted);

      var tempRooms = [];
      var availability = false;
      for (const rooms of duplicateRooms) {
        if (rooms.booking.length > 0) {
          for (const bookings of rooms.booking) {
            if (
              !moment(checkInFormatted).isBetween(
                bookings.checkInDate._i,
                bookings.checkOutDate._i
              ) &&
              moment(checkOutFormatted).isBetween(
                bookings.checkInDate._i,
                bookings.checkOutDate._i
              )
            ) {
              if (
                checkInFormatted !== bookings.checkInDate._i &&
                checkInFormatted !== bookings.checkOutDate._i &&
                checkOutFormatted !== bookings.checkInDate._i &&
                checkOutFormatted !== bookings.checkOutDate._i
              ) {
                availability = true;
              }
            }
          }
        }

        if (availability === true || rooms.booking.length === 0) {
          tempRooms.push(rooms);
        }

        setRooms(tempRooms);
      }
    }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          {/* Date range picker */}
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {/* Conditionally render based on loading and error */}
        {loading ? (
          <h1>Loading.........</h1>
        ) : error ? (
          <h1>Error.....</h1>
        ) : (
          rooms.map((room) => (
            <div className="col-md-9 mt-2" key={room._id}>
              {/* Pass room data and date information to Room component */}

              <Room
                room={room}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RoomFilter;
