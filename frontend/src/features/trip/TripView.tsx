import { useParams } from "react-router-dom";

export function TripView() {
  const params = useParams();
  const tripId = params.tripId;

  if (!tripId) {
    return;
  }

  return <p>{tripId}</p>;
}
