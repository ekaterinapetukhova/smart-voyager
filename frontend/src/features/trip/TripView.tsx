import { LatLngBounds } from "leaflet";
import { Map } from "../../components/map/Map.tsx";
import { Container } from "../../components/common/Container.tsx";

export const TripView = () => {
  return (
    <Container>
      <Map initialBounds={new LatLngBounds([50.23, 19.01], [50.28, 19.06])} />
    </Container>
  );
};
