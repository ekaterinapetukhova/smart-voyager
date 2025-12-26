import { useParams } from "react-router-dom";
import { Container } from "../../../components/common/Container.tsx";
import { useTripById } from "../../../hooks/use-trip-api.ts";
import { TripMap } from "./map/TripMap.tsx";
import { TripInformation } from "./description/TripInformation.tsx";

export function TripView() {
  const params = useParams();

  const tripId = params.tripId!;

  const { data: trip } = useTripById(tripId);

  if (!trip) {
    return;
  }

  return (
    <Container childrenContainerClassNames="w-full pb-4 flex flex-col gap-y-4 md:gap-y-0">
      <TripInformation trip={trip} />
      <TripMap trip={trip} />
    </Container>
  );
}
