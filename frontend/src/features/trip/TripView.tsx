import { useParams } from "react-router-dom";
import { useState } from "react";
import { Container } from "../../components/common/Container.tsx";
import { Title } from "../../components/common/Title.tsx";
import { useTripById } from "../../hooks/use-trip.ts";
import { Map3 } from "../../components/map/Map3.tsx";
import { useTripPointAPI } from "../../hooks/use-trip-point-api.ts";
import { PlacesList } from "./PlacesList.tsx";

export function TripView() {
  const tripPointApi = useTripPointAPI();
  const params = useParams();
  const [clickTripId, setClickTripId] = useState<string | null>();

  const tripId = params.tripId!;

  const { data: trip } = useTripById(tripId);

  if (!trip) {
    return;
  }

  return (
    <Container childrenContainerClassNames="flex-col gap-y-10">
      <Title>{trip.name}</Title>
      <p className="text-text">{trip.description}</p>
      <div className="size-full grid grid-cols-2">
        <PlacesList
          places={trip.waypoints}
          onClick={(id) => {
            setClickTripId(id);
          }}
        />
        <Map3
          points={trip.waypoints}
          onRemovePoint={(id) => void tripPointApi.deleteTripPoint(id)}
          onAddPoint={(point) => void tripPointApi.addTripPoint({ ...point, tripId })}
          activePoint={clickTripId ?? null}
        />
      </div>
    </Container>
  );
}
