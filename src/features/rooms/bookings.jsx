import {
  useGetBookingsQuery,
  useCancelBookingMutation,
  useAddReviewMutation,
} from "./roomSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./rooms.css";

/** Displays a list of rooms that a logged in user has booked, cancels a booking, posts a review*/
export default function Bookings() {
  const { data: bookings = [] } = useGetBookingsQuery();
  const { roomId } = useParams();
  if (roomId) {
    console.log(roomId);
  }
  if (!bookings) return <p>Loading...</p>;
  return (
    <>
      {bookings.length ? (
        <ul className="bookings">
          {bookings.map((booking) => (
            <Booking key={booking.id} booking={booking} />
          ))}
        </ul>
      ) : (
        <p>{"You don't have any bookings yet!"}</p>
      )}
    </>
  );
}

function Booking({ booking }) {
  /** Cancel a booking */
  const [cancelBooking, { isLoading }] = useCancelBookingMutation();
  const tryCancelBooking = (event) => {
    event.preventDefault();
    cancelBooking(booking.id);
  };

  /** Add a new review */
  const [formData, setFormData] = useState({
    description: "",
    rating: "",
    image: "",
    roomId: booking.roomId,
  });

  const navigate = useNavigate();
  const [addReview] = useAddReviewMutation();
  async function postReview(event) {
    event.preventDefault();
    console.log(booking.roomId);
    try {
      console.log(formData);
      const Review = await addReview({
        ...formData,
      }).unwrap();
      navigate(`/rooms/${formData.roomId}/reviews`);
    } catch (e) {
      console.error(e);
    }
  }

  const checkin = new Date(booking.fromDate).toLocaleDateString();
  const checkout = new Date(booking.toDate).toLocaleDateString();

  return (
    <li className="singleBooking">
      <div className="DetailSection">
        <p className="id">Booking ID: {booking.id}</p>
        <p className="checkin">Check-in Date: {checkin}</p>
        <p className="checkout">Check-out Date: {checkout}</p>
        <p className="roomName">Room Name: {booking.room.roomName}</p>
        <p className="desc">Description: {booking.room.description}</p>
        <p className="price">Price: ${booking.room.price}</p>
        <p className="type">{booking.room.type}</p>
        <figure>
          <img src={booking.room.image} alt={booking.room.roomName} />
        </figure>
        <form className="cancelBooking" onSubmit={tryCancelBooking}>
          <button className="btn">
            {isLoading ? "Cancelling..." : "Cancel Booking"}
          </button>
        </form>
      </div>
      <div className="ReviewSection">
        <form className="postReview" onSubmit={postReview}>
          <label>
            Share your experience
            <textarea
              type="text"
              id="description"
              name="description"
              className="inputbox"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </label>
          <label>
            Score the place
            <input
              type="number"
              id="rating"
              name="rating"
              className="inputbox"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
            />
          </label>
          <label>
            Upload your image
            <input
              type="text"
              id="image"
              name="image"
              className="inputbox"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </label>
          <button className="btn" onClick={postReview}>
            Post a review
          </button>
        </form>
      </div>
    </li>
  );
}
