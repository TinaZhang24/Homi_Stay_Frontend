import { createBrowserRouter } from "react-router-dom";
import AuthForm from "./features/auth/AuthForm";
import Root from "./layout/root";
import RoomList from "./features/rooms/RoomList";
import RoomDetail from "./features/rooms/RoomDetail";
import Bookings from "./features/rooms/bookings";
import Login from "./features/auth/AuthForm";
import AdminPanel from "./features/rooms/AdminPanel";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      //   { index: true, element: <HomePage /> },
      { path: "/auth", element: <AuthForm /> },
      { path: "/", element: <RoomList /> },
      { path: "/login", element: <Login /> },
      { path: "/bookings", element: <Bookings /> },
      { path: "/rooms/:roomId", element: <RoomDetail /> },
      { path: "/adminpanel", element: <AdminPanel /> },
      // { path: "/admin/users", element: <AdminUsers /> },
    ],
  },
]);
export default router;
