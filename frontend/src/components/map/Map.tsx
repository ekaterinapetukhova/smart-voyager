import { MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useCallback, useRef, useState } from "react";
import L, { LatLngBounds, LatLngExpression } from "leaflet";
import { Button } from "../common/Button.tsx";
import { TextInput } from "../common/TextInput.tsx";
import { RoutePoint } from "../../types/route-point.types.ts";
import { useRoute } from "../../hooks/use-route.ts";
import { getPlaceName } from "../../utils/get-place-name.ts";
import { Filter, OverpassElement, usePOIs } from "../../hooks/use-poi.ts";
import { RouteMode, RouteType } from "../../types/route.types.ts";
// import { config } from "../../config/config.ts";

const filters: Filter[] = [
  { key: "restaurants", label: "Restaurants", query: 'node["amenity"="restaurant"]' },
  { key: "hotels", label: "Hotels", query: 'node["tourism"="hotel"]' },
  { key: "pharmacies", label: "Pharmacies", query: 'node["amenity"="pharmacy"]' },
  { key: "transit", label: "Transit Stations", query: 'node["public_transport"="station"]' },
];

export const Map = () => {
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
  const [routeName, setRouteName] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [bbox, setBbox] = useState("50.23,19.01,50.28,19.06");
  const [startPoint] = useState<LatLngExpression>([50.25841, 19.02754]);
  const [pois, setPois] = useState<OverpassElement[]>([]);
  const [routeMode, setRouteMode] = useState<RouteMode>(RouteMode.Drive);
  const [routeType, setRouteType] = useState<RouteType>(RouteType.Balanced);

  const selectedFilters = filters.filter((filter) => selectedKeys.includes(filter.key));

  const { addRoute } = useRoute();
  const { loading } = usePOIs(selectedFilters, bbox, fetchTrigger, setPois);

  const mapRef = useRef<L.Map | null>(null);
  const requestIdRef = useRef<string | null>(null);

  const setNewBbox = useCallback(() => {
    if (!mapRef.current) return;

    const bounds: LatLngBounds = mapRef.current.getBounds();
    const newBbox = `${bounds.getSouth().toString()},${bounds.getWest().toString()},${bounds.getNorth().toString()},${bounds.getEast().toString()}`;

    setBbox((prev) => {
      if (prev === newBbox) return prev;

      return newBbox;
    });
  }, []);

  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        const popupElem = (e.originalEvent.target as HTMLElement).closest("button, .leaflet-popup");

        if (popupElem) return;

        const latlng = e.latlng;

        void (async () => {
          const name = await getPlaceName(latlng.lat, latlng.lng);
          const container = L.DomUtil.create("div");

          const label = L.DomUtil.create("p", "", container);
          label.innerText = name ?? "";

          const button = L.DomUtil.create("button", "", container);
          button.innerText = "Add point";
          button.style.border = "1px solid black";
          button.style.cursor = "pointer";

          const popup = L.popup().setLatLng(latlng).setContent(container);
          map.openPopup(popup);

          const newRoutePoint: RoutePoint = {
            name,
            latitude: latlng.lat,
            longitude: latlng.lng,
          };

          button.onclick = () => {
            addRoutePoint(newRoutePoint);

            map.closePopup();
          };
        })();
      },
      moveend: () => {
        setNewBbox();
      },
      zoomend: () => {
        setNewBbox();
      },
    });

    return null;
  };

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

  const toggleFilter = (key: string) => {
    setSelectedKeys((prev) => {
      const updated = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];

      if (!updated.length) {
        setPois([]);
      }

      return updated;
    });
  };

  const handleShowPOIs = () => {
    if (selectedKeys.length > 0) {
      requestIdRef.current = Date.now().toString();

      setFetchTrigger((prev) => !prev);
    }
  };

  const saveRoute = async () => {
    const route = {
      name: routeName,
      mode: routeMode,
      type: routeType,
      waypoints: routePoints,
    };

    await addRoute(route);

    setRoutePoints([]);
    setRouteName("");
  };

  const removePoint = (index: number) => {
    setRoutePoints((prev) => prev.filter((_, i) => i !== index));
  };

  const getMarkerIcon = () => {
    return new L.Icon.Default();
  };

  const NewRouteOverlay = () => (
    <>
      {routePoints.map((point, index) => (
        <Marker key={index} position={[point.latitude, point.longitude]} icon={getMarkerIcon()}>
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

  const FilteredPoints = () => (
    <>
      {pois.map((poi) => {
        if (!poi.lat || !poi.lon) return null;

        return (
          <Marker key={poi.id} position={[poi.lat, poi.lon]}>
            <Popup>
              <p>{poi.tags?.name}</p>
              <Button
                label="Add point"
                onClick={() => {
                  const newRoutePoint: RoutePoint = {
                    name: poi.tags?.name,
                    latitude: poi.lat!,
                    longitude: poi.lon!,
                  };

                  addRoutePoint(newRoutePoint);
                }}
              />
            </Popup>
          </Marker>
        );
      })}
    </>
  );

  const modes = Object.values(RouteMode);

  const types = Object.values(RouteType);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-2 items-center">
            {filters.map((filter) => (
              <label key={filter.key} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedKeys.includes(filter.key)}
                  onChange={() => {
                    toggleFilter(filter.key);
                  }}
                />
                {filter.label}
              </label>
            ))}
            <Button label={loading ? "Loading" : "Show places"} onClick={handleShowPOIs} />
          </div>

          <div className="flex gap-2 items-center">
            {modes.map((mode) => (
              <label key={mode} className="flex items-center gap-1">
                <input
                  type="radio"
                  value={routeMode}
                  name="routeMode"
                  checked={routeMode === mode}
                  onChange={() => {
                    setRouteMode(mode);
                  }}
                />
                {mode[0].toUpperCase() + mode.slice(1)}
              </label>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            {types.map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="radio"
                  value={routeType}
                  name="routeType"
                  checked={routeType === type}
                  onChange={() => {
                    setRouteType(type);
                  }}
                />
                {type[0].toUpperCase() + type.slice(1)}
              </label>
            ))}
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

      <div className="h-[500px] w-full">
        <MapContainer className="h-full" center={startPoint} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents />
          <FilteredPoints />
          <NewRouteOverlay />
        </MapContainer>
      </div>
    </div>
  );
};
