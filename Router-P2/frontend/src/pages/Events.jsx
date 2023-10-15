import { defer, json, useLoaderData, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  // const data = useLoaderData();
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  // const events = data.events;
  // console.log(data, "data");
  // return (
  //   <>
  //     <EventsList events={events} />
  //     {/* <EventsList /> */}
  //   </>
  // );
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events." };
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    
    // return response;
    const resData = await response.json();
    console.log(resData, "response");
    return resData.events;
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};


// export const loader = async () => {
//   const response = await fetch("http://localhost:8080/events");

//   if (!response.ok) {
//     // return { isError: true, message: "Could not fetch events." };
//     // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
//     //   status: 500,
//     // });
//     throw json({ message: "Could not fetch events." }, { status: 500 });
//   } else {
//     console.log(response, "response");
//     return response;
//   }
// };
