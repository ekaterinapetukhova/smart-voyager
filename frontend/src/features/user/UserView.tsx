import { useQuery } from "@tanstack/react-query";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { GeoJsonObject } from "geojson";
import { useUserStore } from "../../store/user-store.ts";
import { Container } from "../../components/common/Container.tsx";
import { Route } from "../../types/route.types.ts";
import { authorizedFetch } from "../../utils/authorized-fetch.ts";

export function UserView() {
  const { user } = useUserStore();

  const map = useMap();

  const { data } = useQuery({
    queryKey: ["me/routes"],
    queryFn: async () => {
      const { get } = await authorizedFetch();

      const response = await get("me/routes");

      return (await response.json()) as Route[];
    },
  });

  data?.forEach((route) => {
    L.geoJSON(route.geojson as GeoJsonObject, {
      style: (feature) => {
        return {
          color: "rgba(20, 137, 255, 0.7)",
          weight: 5,
        };
      },
    })
      .bindPopup((layer) => {
        return `${layer.feature.properties.distance} ${layer.feature.properties.distance_units}, ${layer.feature.properties.time}`;
      })
      .addTo(map);

    return (
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={data[0].geojson as GeoJsonObject} />
      </MapContainer>
    );
  });
  return (
    <section>
      <Container>
        <p>{user?.name}</p>
        <ul>{routesList}</ul>
      </Container>
    </section>
  );
}
