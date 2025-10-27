import { useParams } from "react-router-dom";
import { Container } from "../../../components/common/Container.tsx";
import { useTripById } from "../../../hooks/use-trip-api.ts";
import { TripMap } from "./TripMap.tsx";
import { TripDescription } from "./TripDescription.tsx";

export function TripView() {
  const params = useParams();

  const tripId = params.tripId!;

  const { data: trip } = useTripById(tripId);

  if (!trip) {
    return;
  }

  return (
    <Container childrenContainerClassNames="w-full">
      <TripDescription trip={trip} />
      <TripMap trip={trip} />
    </Container>
  );
}
