import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import { ReactElement, useCallback, useRef, useState } from "react";
import L, { LatLng, LatLngBounds } from "leaflet";
import { GeoJSON } from "geojson";
import { renderToString } from "react-dom/server";
import { GeoJSON as GeoJSONLayer } from "react-leaflet/GeoJSON";
import { Button } from "../common/Button.tsx";
import { TextInput } from "../common/TextInput.tsx";
import { CreatedTrip, TripMode, TripType } from "../../types/trip.types.ts";
import { config } from "../../config/config.ts";
// import { geojson } from "../../geojson.ts";
import MarkerIcon from "/marker.png";
import { useTrip } from "../../hooks/use-trip.ts";
import { TripPoint } from "../../types/trip-point.types.ts";
import { MapPopup } from "./MapPopup.tsx";
import { MarkerPopup } from "./MarkerPopup.tsx";

// const filters: Filter[] = [
//   {
//     key: "restaurants",
//     label: "Restaurants",
//     query: 'node["amenity"="restaurant"]',
//   },
//   { key: "hotels", label: "Hotels", query: 'node["tourism"="hotel"]' },
//   {
//     key: "pharmacies",
//     label: "Pharmacies",
//     query: 'node["amenity"="pharmacy"]',
//   },
//   {
//     key: "transit",
//     label: "Transit Stations",
//     query: 'node["public_transport"="station"]',
//   },
// ];

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

export interface Map2Marker {
  position: LatLng;
  popup?: ReactElement;
  popupOpen?: boolean;
}

export interface Map2Props {
  initialBounds: LatLngBounds;
  miniature?: boolean;
  markers?: Map2Marker[];
  geojson?: GeoJSON;
}

export const Map = (props: Map2Props) => {
  const [tripPoints, setTripPoints] = useState<TripPoint[]>([]);
  const [tripName, setTripName] = useState("");
  // const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // const [fetchTrigger, setFetchTrigger] = useState(false);
  // const [bbox, setBbox] = useState(props.initialBounds.toBBoxString());
  // const [pois, setPois] = useState<GeoapifyPOI[]>([]);
  // const [routeMode, setTripMode] = useState<TripMode>(TripMode.Drive);
  // const [routeType, setTripType] = useState<TripType>(TripType.Balanced);

  // const filters = Object.values(TripCategories);
  //
  // const selectedFilters = filters.filter((filter) => selectedKeys.includes(filter));

  const { addTrip } = useTrip();
  // const { loading } = usePOIs(selectedFilters, bbox, fetchTrigger, setPois);

  const mapRef = useRef<L.Map | null>(null);

  // const setNewBbox = useCallback(() => {
  //   if (!mapRef.current) return;
  //
  //   const bounds: LatLngBounds = mapRef.current.getBounds();
  //   const newBbox = bounds.toBBoxString();
  //
  //   setBbox((prev) => {
  //     if (prev === newBbox) return prev;
  //
  //     return newBbox;
  //   });
  // }, []);

  const geoJsonAdded = useRef(false);

  const addGeoJson = useCallback((map: L.Map) => {
    if (geoJsonAdded.current || !props.geojson) {
      return;
    }

    L.geoJSON(props.geojson, {
      style: {
        color: "#FF2222",
        weight: 5,
        opacity: 1.0,
      },
    }).addTo(map);

    geoJsonAdded.current = true;
  }, []); // maybe dep on geojson but needs to remove old one

  const markersAdded = useRef(false);

  const addMarkers = useCallback((map: L.Map) => {
    if (markersAdded.current || !props.markers || props.markers.length === 0) {
      return;
    }

    for (const marker of props.markers) {
      const instance = L.marker(marker.position).addTo(map);

      if (marker.popup) {
        const popup = instance.bindPopup(renderToString(marker.popup));

        if (marker.popupOpen) {
          popup.openPopup();
        }
      }
    }

    markersAdded.current = true;
  }, []); // maybe dep on markers but needs to remove old one

  const addTripPoint = (newTripPoint: TripPoint) => {
    setTripPoints((prev) => [
      ...prev,
      {
        name: newTripPoint.name,
        latitude: newTripPoint.latitude,
        longitude: newTripPoint.longitude,
      },
    ]);
  };

  // const toggleFilter = (key: string) => {
  //   setSelectedKeys((prev) => {
  //     const updated = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
  //
  //     if (!updated.length) {
  //       setPois([]);
  //     }
  //
  //     return updated;
  //   });
  // };
  //
  // const handleShowPOIs = () => {
  //   if (selectedKeys.length > 0) {
  //     setFetchTrigger((prev) => !prev);
  //   }
  // };

  const saveTrip = async () => {
    const route: CreatedTrip = {
      name: tripName,
      mode: TripMode.Drive,
      type: TripType.Balanced,
      waypoints: tripPoints,
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

  // const FilteredPoints = () => (
  //   <>
  //     {pois.map((poi) => {
  //       if (!poi.lat || !poi.lon) return null;
  //
  //       console.log(poi);
  //
  //       return (
  //         <Marker key={poi.id} position={[poi.lat, poi.lon]}>
  //           <Popup>
  //             <p>{poi.tags?.name}</p>
  //             <Button
  //               label="Add point"
  //               onClick={() => {
  //                 const newTripPoint: TripPoint = {
  //                   name: poi.tags?.name,
  //                   latitude: poi.lat!,
  //                   longitude: poi.lon!,
  //                 };
  //
  //                 addTripPoint(newTripPoint);
  //               }}
  //             />
  //           </Popup>
  //         </Marker>
  //       );
  //     })}
  //   </>
  // );

  // const modes = Object.values(TripMode);
  //
  // const types = Object.values(TripType);

  return (
    <div className={props.miniature ? "" : "size-full"}>
      {!props.miniature && (
        <div className="flex gap-x-5 max-w-sm justify-center items-center text-text">
          <TextInput
            placeholder="Trip name"
            value={tripName}
            onChange={(e) => {
              setTripName(e.target.value);
            }}
          />
          <div className="w-1/3">
            <Button label="Save route" onClick={() => void saveTrip()} size="medium" />
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-2 items-center">
            {/*{filters.map((filter) => (*/}
            {/*  <label key={filter} className="flex items-center gap-1">*/}
            {/*    <input*/}
            {/*      type="checkbox"*/}
            {/*      checked={selectedKeys.includes(filter)}*/}
            {/*      onChange={() => {*/}
            {/*        toggleFilter(filter);*/}
            {/*      }}*/}
            {/*    />*/}
            {/*    {filter}*/}
            {/*  </label>*/}
            {/*))}*/}
            {/*<Button label={loading ? "Loading" : "Show places"} onClick={handleShowPOIs} />*/}
          </div>

          <div className="flex gap-2 items-center">
            {/*{modes.map((mode) => (*/}
            {/*  <label key={mode} className="flex items-center gap-1">*/}
            {/*    <input*/}
            {/*      type="radio"*/}
            {/*      value={routeMode}*/}
            {/*      name="routeMode"*/}
            {/*      checked={routeMode === mode}*/}
            {/*      onChange={() => {*/}
            {/*        setTripMode(mode);*/}
            {/*      }}*/}
            {/*    />*/}
            {/*    {mode[0].toUpperCase() + mode.slice(1)}*/}
            {/*  </label>*/}
            {/*))}*/}
          </div>

          <div className="flex gap-2 items-center">
            {/*{types.map((type) => (*/}
            {/*  <label key={type} className="flex items-center gap-1">*/}
            {/*    <input*/}
            {/*      type="radio"*/}
            {/*      value={routeType}*/}
            {/*      name="routeType"*/}
            {/*      checked={routeType === type}*/}
            {/*      onChange={() => {*/}
            {/*        setTripType(type);*/}
            {/*      }}*/}
            {/*    />*/}
            {/*    {type[0].toUpperCase() + type.slice(1)}*/}
            {/*  </label>*/}
            {/*))}*/}
          </div>
        </div>
      </div>

      <div className={["relative z-0 mx-auto", props.miniature ? "h-60 w-80" : "h-4/5 w-full"].join(" ")}>
        <MapContainer
          className="h-full outline-none"
          center={props.initialBounds.getCenter()}
          zoom={18}
          scrollWheelZoom
          preferCanvas={true}
          zoomControl={!props.miniature}
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
