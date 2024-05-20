export async function fetchEvents() {
  const response = fetch("http://localhost:3000/events");

  if (!response.ok) {
    const error = new Error("An error occured");
    error.code = (await response).status;
    error.info = (await response).json();
    throw error; //throwing error is important so that we may get hold of this inisde our useQuery object.
  }
  const { events } = (await response).json();
  return events;
}
