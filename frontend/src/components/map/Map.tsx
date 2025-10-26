import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { config } from "../../config/config.ts";
import { ExistingTripPoint, TripPoint } from "../../types/trip-point.types.ts";
import { createBoundsFromPoints } from "../../utils/create-bounds.ts";
import { AddNewPointPopup } from "./AddNewPointPopup.tsx";
import { ExistingPointMarker } from "./ExistingPointMarker.tsx";

export interface MapProps {
  points: ExistingTripPoint[];
  activePoint: string | null;
  onRemovePoint: (id: string) => void;
  onAddPoint: (point: TripPoint) => void;
  classNames?: string;
}

function ProvideMapFragment(props: { setMap: (map: L.Map) => void }) {
  const map = useMap();

  useEffect(() => {
    props.setMap(map);
  }, [props, map]);

  return <></>;
}

export function Map(props: MapProps) {
  const map = useRef<L.Map | null>(null);

  const bounds = useMemo(() => {
    if (!props.points.length) {
      return new LatLngBounds([41.902277040963696, -2.3273195623469216], [55.57834467218206, 33.444164812653085]);
    }

    const coordinates = props.points.map((x) => [x.latitude, x.longitude]);

    return createBoundsFromPoints(coordinates);
  }, [props.points]);

  useEffect(() => {
    if (!map.current || !props.activePoint) return;

    const foundPoint = props.points.find((x) => x.id === props.activePoint);

    if (!foundPoint) return;

    map.current.flyTo([foundPoint.latitude, foundPoint.longitude], 18, {
      duration: 1,
    });
  }, [props, props.activePoint, props.points]);

  const TripOverlay = () => (
    <>
      {props.points.map((point) => (
        <ExistingPointMarker
          key={point.id}
          onRemove={() => {
            props.onRemovePoint(point.id);
          }}
          point={point}
        />
      ))}
      {props.points.length >= 2 && (
        <Polyline
          positions={props.points.map((p) => [p.latitude, p.longitude])}
          smoothFactor={1}
          pathOptions={{
            color: "#FF09EE",
            weight: 4,
            dashArray: "8 6",
            lineCap: "butt",
          }}
        />
      )}
    </>
  );

  return (
    <div className={["size-full", props.classNames ?? ""].join(" ")}>
      <div className="relative z-0 mx-auto size-full">
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
          <AddNewPointPopup onAdd={props.onAddPoint} />
          <TripOverlay />
        </MapContainer>
      </div>
    </div>
  );
}
