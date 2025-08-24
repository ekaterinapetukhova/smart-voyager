import { useQuery } from "@tanstack/react-query";
import { LatLngBounds } from "leaflet";
import { useUserStore } from "../../store/user-store.ts";
import { Container } from "../../components/common/Container.tsx";
import { Route } from "../../types/route.types.ts";
import { authorizedFetch } from "../../utils/authorized-fetch.ts";
import { Map } from "../../components/map/Map.tsx";

export function UserView() {
  const { user } = useUserStore();

  const get = useQuery({
    queryKey: ["me/routes"],
    queryFn: async () => {
      const { get } = await authorizedFetch();

      const response = await get("me/routes");

      return (await response.json()) as Route[];
    },
  });

  console.log(get);
  // function MyComponent() {
  //   const map = useMap();
  //
  //   data?.forEach((route) => {
  //     const geojson = toGeoJSON(route.geojson);
  //
  //     L.geoJSON(geojson, {
  //       style: (feature) => {
  //         return {
  //           color: "rgba(20, 137, 255, 0.7)",
  //           weight: 5,
  //         };
  //       },
  //     })
  //       .bindPopup((layer) => {
  //         return `${layer.feature.properties.distance} ${layer.feature.properties.distance_units}, ${layer.feature.properties.time}`;
  //       })
  //       .addTo(map);
  //
  //     return null;
  //   });
  // }
  //
  // function MyMapComponent() {
  //   return (
  //     <MapContainer className="h-[500px]" center={[50.5, 30.5]} zoom={13}>
  //       <TileLayer
  //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //       />
  //       <MyComponent />
  //     </MapContainer>
  //   );
  // }

  return (
    <section>
      <Container>
        <p>{user?.name}</p>
        {/*<ul>{routesList}</ul>*/}
        {/*<MyMapComponent />*/}
        <Map initialBounds={new LatLngBounds([50.23, 19.01], [50.28, 19.06])} />
      </Container>
    </section>
  );
}
