import { Link, Outlet, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Header from "../Header.jsx";
import { deleteEvent, fetchEvent } from "../../utils/http.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from "../../utils/http.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isPending, error, isError } = useQuery({
    querykey: ["events", { id: id }],
    queryFn: ({ signal }) => {
      fetchEvent({ signal, id });
    },
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    error: deleteError,
    isError: isDeleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: none,
      });
      navigate("/events");
    },
  });
  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDeleting() {
    setIsDeleting(false);
  }
  function handleDelete() {
    mutate({ id });
  }
  let content;
  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock title="Error" message={error.info?.message} />
      </div>
    );
  }

  if (data) {
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={data.image} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {data.date} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDeleting}>
          <h2>Are you sure you want to delete?</h2>

          {isPendingDeletion && <p>Submitting please wait...</p>}
          {!isPendingDeletion && (
            <div className="form-actions">
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleStopDeleting}>Cancel</button>
            </div>
          )}
          {isDeleteError && (
            <ErrorBlock title="error" message={error.info?.message} />
          )}
        </Modal>
      )}

      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
