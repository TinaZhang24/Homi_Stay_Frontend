import { createBrowserRouter } from "react-router-dom";
import AuthForm from "./features/auth/AuthForm";
import Root from "./layout/root";
import RoomList from "./features/rooms/RoomList";
import RoomDetail from "./features/rooms/RoomDetail";
import Bookings from "./features/rooms/bookings";
import Login from "./features/auth/AuthForm";
import AdminPage from "./features/admin/adminPage";
import AdminUsers from "./features/admin/adminUsers";
import AdminBookings from "./features/admin/adminBookings";
import AdminRooms from "./features/admin/adminRooms";
import UserDelete from "./features/admin/UserDeletePage";
import BookingDelete from "./features/admin/BookingDeletePage";
import RoomDelete from "./features/admin/RoomDeletePage";
import Reviews from "./features/reviews/Reviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      //   { index: true, element: <HomePage /> },
      { path: "/auth", element: <AuthForm /> },
      { path: "/", element: <RoomList /> },
      { path: "/users/login", element: <Login /> },
      { path: "/bookings", element: <Bookings /> },
      { path: "/rooms/:roomId", element: <RoomDetail /> },
      { path: "/rooms/:roomId/reviews", element: <Reviews /> },
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
