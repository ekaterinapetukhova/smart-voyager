import { useParams } from "react-router-dom";
import { GeoJSON } from "geojson";
import { Container } from "../../components/common/Container.tsx";
import { useTripById } from "../../hooks/use-trip.ts";
import { Title } from "../../components/common/Title.tsx";
import { Map } from "../../components/map/Map.tsx";
import { createBounds } from "../../utils/create-bounds.ts";
import { TripPoint } from "../../types/trip-point.types.ts";
import { PlacesList } from "./PlacesList.tsx";

export function TripView() {
  const params = useParams();
  const tripId = params.tripId!;

  const { data: trip } = useTripById(tripId);

  if (!trip) {
    return;
  }

  const geojson = JSON.parse(trip.geojson) as GeoJSON;

  const bounds = createBounds(geojson);

  const places = trip.waypoints.map((waypoint) => {
    return {
      name: waypoint.name,
      longitude: waypoint.longitude,
      latitude: waypoint.latitude,
    } satisfies TripPoint;
  });

  return (
    <Container childrenContainerClassNames="flex-col gap-y-10">
      <Title>{trip.name}</Title>
      <p className="text-text">{trip.description}</p>
      <div className="size-full grid grid-cols-2">
        <PlacesList places={places} />
        <Map initialBounds={bounds} markers={places} />
      </div>
    </Container>
  );
}
