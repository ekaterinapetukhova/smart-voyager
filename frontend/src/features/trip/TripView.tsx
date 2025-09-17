import { LatLngBounds } from "leaflet";
import { Map } from "../../components/map/Map.tsx";
import { Container } from "../../components/common/Container.tsx";
import { TripCreationOptions } from "../../types/trip.types.ts";

export const TripView = () =>
  const options = Object.entries(TripCreationOptions).map(([key, value]) => {
    return (<li></li>)
  })

  return (
    <Container>
      <Map initialBounds={new LatLngBounds([50.23, 19.01], [50.28, 19.06])} />
    </Container>
  );
};
