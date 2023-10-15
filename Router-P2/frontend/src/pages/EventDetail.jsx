import {
  useLoaderData,
  json,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  // const data = useRouteLoaderData("event-detail");
  // const data = useLoaderData()
  const { events, event } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    // return response;
    const resData = await response.json();
    console.log(resData, "response");
    return resData.events;
  }
};

const loadEvent = async (id) => {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
};
export const loader = async ({ request, params }) => {
  const id = params.eventId;
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
};

// export const loader = async ({ request, params }) => {
//   const id = params.eventId;
//   const response = await fetch(`http://localhost:8080/events/${id}`);

//   if (!response.ok) {
//     throw json(
//       { message: "Could not fetch details for selected event" },
//       { status: 500 }
//     );
//   } else {
//     return response;
//   }
// };

export const action = async ({ request, params }) => {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
    headers: { "Content-Type": "application/json" },
  });

  if (!response)
    throw json({ message: "Could not delete Event" }, { status: 500 });
  return redirect("/events");
};
