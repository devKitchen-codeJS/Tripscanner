/** @format */

import AdminProfileLayout from "../Common/admin-profile-layout/admin-profile-layout";
import FlightSearch from "../Pages/search-page";
// import HotelsPage from "../Pages/hotels-page";
// import StartPage from "../Pages/flights-page";
// import Add from "../Common/adminHomeTab/add";
import TicketDetailsPage from "../Pages/ticket-page";
import StartPage from "../Pages/welcome-page";

export const routes = [
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/flight-search",
    element: <FlightSearch />,
  },
  {
    path: "/admin-profile",
    element: <AdminProfileLayout />,
  },
  {
    path: "/add",
    // element: <Add />,
  },
  {
    path: "/ticket-details",
    element: <TicketDetailsPage />,
  },
];
