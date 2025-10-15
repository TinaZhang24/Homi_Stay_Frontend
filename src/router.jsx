import { createBrowserRouter } from "react-router-dom";
import AuthForm from "./features/auth/AuthForm";
import RootComp from "./layout/RootComp";
import RoomListComp from "./features/rooms/RoomListComp";
import RoomDetailComp from "./features/rooms/RoomDetailComp";
import BookingsComp from "./features/rooms/BookingsComp";
import Login from "./features/auth/AuthForm";
import AdminPage from "./features/admin/AdminPage";
import AdminUsers from "./features/admin/AdminUsers";
import AdminBookings from "./features/admin/AdminBookings";
import AdminRooms from "./features/admin/AdminRooms";
import UserDelete from "./features/admin/UserDeletePage";
import BookingDelete from "./features/admin/BookingDeletePage";
import RoomDelete from "./features/admin/RoomDeletePage";
import ReviewsComp from "./features/reviews/ReviewsComp";
// Define the routes for the application
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComp />,
    children: [
      { path: "/auth", element: <AuthForm /> },
      { path: "/", element: <RoomListComp /> },
      { path: "/users/login", element: <Login /> },
      { path: "/bookings", element: <BookingsComp /> },
      { path: "/rooms/:roomId", element: <RoomDetailComp /> },
      { path: "/rooms/:roomId/reviews", element: <ReviewsComp /> },
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/users", element: <AdminUsers /> },
      { path: "/admin/bookings", element: <AdminBookings /> },
      { path: "/admin/rooms", element: <AdminRooms /> },
      { path: "/admin/users/:userId", element: <UserDelete /> },
      { path: "/admin/bookings/:bookingId", element: <BookingDelete /> },
      { path: "/admin/rooms/:roomId", element: <RoomDelete /> },
    ],
  },
]);
export default router;
