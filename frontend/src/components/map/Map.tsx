import { LayersControl, MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { ReactElement, useCallback, useRef, useState } from "react";
import L, { LatLng, LatLngBounds } from "leaflet";
import { GeoJSON } from "geojson";
import { renderToString } from "react-dom/server";
import { Button } from "../common/Button.tsx";
import { TextInput } from "../common/TextInput.tsx";
import { RoutePoint } from "../../types/route-point.types.ts";
import { useRoute } from "../../hooks/use-route.ts";
import { getPlaceName } from "../../utils/get-place-name.ts";
import { CreatedRoute, RouteMode, RouteType } from "../../types/route.types.ts";
import { config } from "../../config/config.ts";
// import { geojson } from "../../geojson.ts";
import MarkerIcon1 from "/marker.png";
import { MapEvents } from "./MapEvents.tsx";

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
  markers?: Map2Marker[];
  geojson?: GeoJSON;
}

export const Map = (props: Map2Props) => {
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
  const [routeName, setRouteName] = useState("");
  // const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // const [fetchTrigger, setFetchTrigger] = useState(false);
  // const [bbox, setBbox] = useState(props.initialBounds.toBBoxString());
  // const [pois, setPois] = useState<GeoapifyPOI[]>([]);
  // const [routeMode, setRouteMode] = useState<RouteMode>(RouteMode.Drive);
  // const [routeType, setRouteType] = useState<RouteType>(RouteType.Balanced);

  // const filters = Object.values(RouteCategories);
  //
  // const selectedFilters = filters.filter((filter) => selectedKeys.includes(filter));

  const { addRoute } = useRoute();
  // const { loading } = usePOIs(selectedFilters, bbox, fetchTrigger, setPois);

  const { BaseLayer } = LayersControl;

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

  const addRoutePoint = (newRoutePoint: RoutePoint) => {
    setRoutePoints((prev) => [
      ...prev,
      {
        name: newRoutePoint.name,
        latitude: newRoutePoint.latitude,
        longitude: newRoutePoint.longitude,
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

  const saveRoute = async () => {
    const route: CreatedRoute = {
      name: routeName,
      mode: RouteMode.Drive,
      type: RouteType.Balanced,
      waypoints: routePoints,
    };

    await addRoute(route);

    setRoutePoints([]);
    setRouteName("");
  };

  const removePoint = (index: number) => {
    setRoutePoints((prev) => prev.filter((_, i) => i !== index));
  };

  const markerIcon = new L.Icon({
    iconUrl: MarkerIcon1,
    iconSize: [40, 50], // размер иконки
    iconAnchor: [20, 40], // точка "прилипания" (ниже середины)
    popupAnchor: [0, -40], // смещение попапа
  });

  const NewRouteOverlay = () => (
    <>
      {routePoints.map((point, index) => (
        <Marker key={index} position={[point.latitude, point.longitude]} icon={markerIcon}>
          <Popup>
            <p>{point.name}</p>
            <Button
              label="Remove point"
              onClick={() => {
                removePoint(index);
              }}
            />
          </Popup>
        </Marker>
      ))}
      {routePoints.length >= 2 && (
        <Polyline positions={routePoints.map((p) => [p.latitude, p.longitude])} color="blue" />
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
  //                 const newRoutePoint: RoutePoint = {
  //                   name: poi.tags?.name,
  //                   latitude: poi.lat!,
  //                   longitude: poi.lon!,
  //                 };
  //
  //                 addRoutePoint(newRoutePoint);
  //               }}
  //             />
  //           </Popup>
  //         </Marker>
  //       );
  //     })}
  //   </>
  // );

  // const modes = Object.values(RouteMode);
  //
  // const types = Object.values(RouteType);

  return (
    <div className="size-full">
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
            {/*        setRouteMode(mode);*/}
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
            {/*        setRouteType(type);*/}
            {/*      }}*/}
            {/*    />*/}
            {/*    {type[0].toUpperCase() + type.slice(1)}*/}
            {/*  </label>*/}
            {/*))}*/}
          </div>
        </div>

        <div className="flex flex-col gap-y-2 max-w-sm justify-center items-center">
          <TextInput
            label="Route name"
            type="text"
            value={routeName}
            onChange={(e) => {
              setRouteName(e.target.value);
            }}
          />
          <Button label="Save route" onClick={() => void saveRoute()} />
        </div>
      </div>

      <div className="h-4/5 w-full relative z-0 mx-auto">
        <MapContainer
          className="h-full"
          center={props.initialBounds.getCenter()}
          zoom={18}
          scrollWheelZoom
          preferCanvas={true}
        >
          <TileLayer
            attribution='Powered by <a href="https://www.geoapify.com/">Geoapify</a>'
            url={`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}@2x.png?apiKey=${config.geoapifyKey}`}
            className="filter saturate-200 hue-rotate-180 contrast-110"
          />
          <MapEvents addRoutePoint={addRoutePoint} />
          {/*<FilteredPoints />*/}
          <NewRouteOverlay />
        </MapContainer>
      </div>
    </div>
  );
};
