import { useTripApi } from "../../../hooks/use-trip-api.ts";
import { TripsList } from "./TripsList.tsx";

export function PlannedTripsListView() {
  const { plannedTrips } = useTripApi();

  return <TripsList trips={plannedTrips} />;
}
