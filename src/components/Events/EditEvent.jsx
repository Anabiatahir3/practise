import {
  Link,
  useNavigate,
  useParams,
  redirect,
  useSubmit,
  useNavigation,
} from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../utils/http.jsx";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvents, updateEvent } from "../../utils/http.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const submit = useSubmit();
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useNavigation();

  const { data, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvents({ signal, id }),
    staleTime: 10000,
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;
  //     const previousEvent = queryClient.getQueryData(["events", id]);
  //     await queryClient.cancelQueries({ queryKey: ["events", id] });
  //     queryClient.setQueryData(["events", id], newEvent);
  //     return { previousEvent };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["events", id], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["events", id]);
  //   },
  // });

  function handleSubmit(formData) {
    // mutate({ id, event: formData });
    // navigate("../")
    submit(formData, { method: "PUT" }); // this is not sending http req to the server, this code will just trigger the action fucntion that is defined down below(i.e client side)
  }

  function handleClose() {
    navigate("../");
  }
  let content;

  // if (isPending) {
  //   content = (
  //     <>
  //       <div className="center">
  //         <LoadingIndicator />
  //       </div>
  //     </>
  //   );
  // }
  if (isError) {
    content = (
      <div className="center">
        <ErrorBlock title="Error" message={error.info?.message} />
        <div className="form-actions">
          <Link to="../" className="button">
            Ok
          </Link>
        </div>
      </div>
    );
  }
  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>Sending data</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button onClick={handleSubmit} type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvents({ signal, id: params.id }),
  }); //fetch query to send query programtically
} //we still keep the useQuery from above as this query will keep the data cached and when the query from useQuery runs ot will be instant

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEvent = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: formData });
  await queryClient.invalidateQueries(["events"]);
  return redirect("../");
} // this function needs a submission trigger to execute this function.
