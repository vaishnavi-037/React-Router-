import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import EditForm from "../components/EventForm";

const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");

  return <EditForm event={data.event} method="patch"/>;
};

export default EditEventPage;

