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
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/users", element: <AdminUsers /> },
      { path: "/admin/bookings", element: <AdminBookings /> },
      { path: "/admin/rooms", element: <AdminRooms /> },
    ],
  },
]);
export default router;
