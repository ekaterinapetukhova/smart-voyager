import { LatLngBounds } from "leaflet";
import { Container } from "../../components/common/Container.tsx";
import { Map } from "../../components/map/Map.tsx";

export function NewTripView() {
  return (
    <Container childrenContainerClassNames="flex-col items-start">
      <Map initialBounds={new LatLngBounds([50.23, 19.01], [50.28, 19.06])} />
    </Container>
  );
}
