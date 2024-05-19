import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import EventDetailPage from "./pages/EventDetail";
import EventsPage from "./pages/Events";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "events",
          element: <EventsPage />,
        },
        {
          path: "events/:eventId",
          element: <EventDetailPage />,
        },
        {
          path: "events/new",
          element: <NewEventPage />,
        },
        {
          path: "events/:eventId/edit",
          element: <EditEventPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
