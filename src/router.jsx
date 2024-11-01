import { createBrowserRouter } from "react-router-dom";
import AuthForm from "./features/auth/AuthForm";
import Root from "./layout/root";
import RoomList from "./features/rooms/RoomList";
import RoomDetail from "./features/rooms/RoomDetail";
// import AvailableRooms from "./features/rooms/AvailableRooms";
import AvailabilityForm from "./features/rooms/AvailabilyForm";
import Login from "./features/auth/AuthForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      //   { index: true, element: <HomePage /> },
      { path: "/auth", element: <AuthForm /> },
      { path: "/", element: <RoomList /> },
      { path: "/users/login", element: <Login /> },
      // To check correctness for the route below
      // {
      //   path: `/rooms/:available?${fromDate}&${toDate}`,
      //   element: <AvailabilityForm />,
      // },
      { path: "/rooms/:roomId", element: <RoomDetail /> },
    ],
  },
]);
export default router;
