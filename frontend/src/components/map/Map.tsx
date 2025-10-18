import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import L, { LatLngBounds } from "leaflet";
import { GeoJSON } from "geojson";
import { GeoJSON as GeoJSONLayer } from "react-leaflet/GeoJSON";
import { CreatedTrip, TripMode, TripType } from "../../types/trip.types.ts";
import { config } from "../../config/config.ts";
// import { geojson } from "../../geojson.ts";
import MarkerIcon from "/marker.png";
import { useTrip } from "../../hooks/use-trip.ts";
import { TripPoint } from "../../types/trip-point.types.ts";
import { MapPopup } from "./MapPopup.tsx";
import { MarkerPopup } from "./MarkerPopup.tsx";

export interface GeoapifyPOI {
  id: string;
  properties: {
    name: string;
    category: string;
  };
  geometry: {
    coordinates: [number, number]; // [lon, lat]
  };
}

export interface Map2Props {
  initialBounds: LatLngBounds;
  miniature?: boolean;
  markers?: TripPoint[];
  geojson?: GeoJSON;
}

export const Map = (props: Map2Props) => {
  const [tripPoints, setTripPoints] = useState<TripPoint[]>(props.markers ?? []);
  const [tripName, setTripName] = useState("");

  const { addTrip } = useTrip();

  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [mapRef]);

  const addTripPoint = (newTripPoint: TripPoint) => {
    setTripPoints((prev) => [
      ...prev,
      {
        name: newTripPoint.name,
        latitude: newTripPoint.latitude,
        longitude: newTripPoint.longitude,
        fullAddress: newTripPoint.fullAddress,
      },
    ]);
  };

  const saveTrip = async () => {
    const route: CreatedTrip = {
      name: tripName,
      mode: TripMode.Drive,
      type: TripType.Balanced,
      waypoints: tripPoints,
      description: "",
    };

    await addTrip(route);

    setTripPoints([]);
    setTripName("");
  };

  const removePoint = (index: number) => {
    setTripPoints((prev) => prev.filter((_, i) => i !== index));
  };

  const markerIcon = new L.Icon({
    iconUrl: MarkerIcon,
    iconSize: [40, 50],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const NewTripOverlay = () => (
    <>
      {tripPoints.map((point, index) => (
        <Marker key={index} position={[point.latitude, point.longitude]} icon={markerIcon}>
          <MarkerPopup
            onRemove={() => {
              removePoint(index);
            }}
            point={point}
          />
        </Marker>
      ))}
      {tripPoints.length >= 2 && (
        <Polyline
          positions={tripPoints.map((p) => [p.latitude, p.longitude])}
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
    <div className={props.miniature ? "" : "size-full"}>
      {/*{!props.miniature && (*/}
      {/*  <div className="flex gap-x-5 max-w-sm justify-center items-center text-text">*/}
      {/*    <TextInput*/}
      {/*      placeholder="Trip name"*/}
      {/*      value={tripName}*/}
      {/*      onChange={(e) => {*/}
      {/*        setTripName(e.target.value);*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    <div className="w-1/3">*/}
      {/*      <Button label="Save route" onClick={() => void saveTrip()} size="medium" />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}

      <div className="flex justify-between">
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-2 items-center"></div>

          <div className="flex gap-2 items-center"></div>

          <div className="flex gap-2 items-center"></div>
        </div>
      </div>

      <div className={["relative z-0 mx-auto", props.miniature ? "h-60 w-80" : "h-4/5 w-full"].join(" ")}>
        <MapContainer
          className="h-full outline-none"
          scrollWheelZoom
          preferCanvas={true}
          zoomControl={!props.miniature}
          bounds={props.initialBounds}
        >
          <TileLayer
            attribution='Powered by <a href="https://www.geoapify.com/">Geoapify</a>'
            url={`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}@2x.png?apiKey=${config.geoapifyKey}`}
            className="filter saturate-200 hue-rotate-180 contrast-110"
          />
          <MapPopup onAdd={addTripPoint} />
          {/*<FilteredPoints />*/}
          <NewTripOverlay />
          {props.geojson && (
            <>
              <GeoJSONLayer
                data={props.geojson}
                style={() => ({
                  color: "#FF09EE",
                  weight: 5,
                  opacity: 1.0,
                })}
              />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
};
