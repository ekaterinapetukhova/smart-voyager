import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { config } from "../../config/config.ts";
import MarkerIcon from "/marker.png";
import { ExistingTripPoint, TripPoint } from "../../types/trip-point.types.ts";
import { createBoundsFromPoints } from "../../utils/create-bounds.ts";
import { MapPopup } from "./MapPopup.tsx";
import { MarkerPopup } from "./MarkerPopup.tsx";

export interface Map3Props {
  points: ExistingTripPoint[];
  activePoint: string | null;
  onRemovePoint: (id: string) => void;
  onAddPoint: (point: TripPoint) => void;
}

function ProvideMapFragment(props: { setMap: (map: L.Map) => void }) {
  const map = useMap();

  useEffect(() => {
    props.setMap(map);
  }, [props, map]);

  return <></>;
}

export const Map3 = (props: Map3Props) => {
  const map = useRef<L.Map | null>(null);

  const bounds = useMemo(() => {
    const coordinates = props.points.map((x) => [x.latitude, x.longitude]);

    return createBoundsFromPoints(coordinates);
  }, [props.points]);

  useEffect(() => {
    if (!map.current || !props.activePoint) return;

    const foundPoint = props.points.find((x) => x.id === props.activePoint);

    if (!foundPoint) return;

    map.current.fitBounds(createBoundsFromPoints([[foundPoint.latitude, foundPoint.longitude]]));
  }, [props, props.activePoint, props.points]);

  const markerIcon = new L.Icon({
    iconUrl: MarkerIcon,
    iconSize: [40, 50],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const TripOverlay = () => (
    <>
      {props.points.map((point) => (
        <Marker key={point.id} position={[point.latitude, point.longitude]} icon={markerIcon}>
          <MarkerPopup
            onRemove={() => {
              props.onRemovePoint(point.id);
            }}
            point={point}
          />
        </Marker>
      ))}
      {props.points.length >= 2 && (
        <Polyline
          positions={props.points.map((p) => [p.latitude, p.longitude])}
          pathOptions={{
            color: "#FF09EE",
            weight: 4,
            dashArray: "8 6",
            lineCap: "square",
          }}
        />
      )}
    </>
  );

  return (
    <div className="size-full">
      <div className={["relative z-0 mx-auto", "h-4/5 w-full"].join(" ")}>
        <MapContainer
          className="h-full outline-none"
          scrollWheelZoom
          preferCanvas={true}
          zoomControl={true}
          bounds={bounds}
        >
          <ProvideMapFragment setMap={(m) => (map.current = m)} />
          <TileLayer
            attribution='Powered by <a href="https://www.geoapify.com/">Geoapify</a>'
            url={`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}@2x.png?apiKey=${config.geoapifyKey}`}
            className="filter saturate-200 hue-rotate-180 contrast-110"
          />
          <MapPopup onAdd={props.onAddPoint} />
          <TripOverlay />
        </MapContainer>
      </div>
    </div>
  );
};
