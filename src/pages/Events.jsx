const DUMMY_EVENTS = [
  {
    eventId: "e1",
    title: "Event 1",
  },
  {
    eventId: "e2",
    title: "Event 2",
  },
];
import { Link } from "react-router-dom";
export default function EventsPage() {
  return (
    <>
      <h1>Events Page</h1>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.eventId}>
            <Link to={event.eventId}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
