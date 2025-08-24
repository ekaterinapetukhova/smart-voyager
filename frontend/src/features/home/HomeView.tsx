import { LatLngBounds } from "leaflet";
import { Map } from "../../components/map/Map.tsx";
import { Container } from "../../components/common/Container.tsx";

export const HomeView = () => {
  // const markers: Map2Marker[] = [
  //   {
  //     position: new LatLng(50.26, 19.05),
  //     popup: <b>Hello</b>,
  //     popupOpen: true,
  //   },
  //   {
  //     position: new LatLng(50.27, 19.04),
  //     popup: <b>Hello 2</b>,
  //     popupOpen: false,
  //   },
  // ];

  return (
    <section>
      <Container>
        <Map initialBounds={new LatLngBounds([50.23, 19.01], [50.28, 19.06])} />
      </Container>
    </section>
  );
};
