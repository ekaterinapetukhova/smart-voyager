import { useTripApi } from "../../../hooks/use-trip-api.ts";
import { TripsList } from "./TripsList.tsx";

export function DraftTripsListView() {
  const { draftTrips } = useTripApi();

  return <TripsList trips={draftTrips} />;
}
