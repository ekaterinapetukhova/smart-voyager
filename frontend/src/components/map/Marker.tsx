import L from "leaflet";
import { TripPoint } from "../../types/trip-point.types.ts";
import { MarkerPopup } from "./MarkerPopup.tsx";
import MarkerIcon from "*.png";

interface MarkerProps {
  point: TripPoint;
  key: string;
}

export function Marker() {
  const markerIcon = new L.Icon({
    iconUrl: MarkerIcon,
    iconSize: [40, 50],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <Marker key={index} position={[point.latitude, point.longitude]} icon={markerIcon}>
      <MarkerPopup
        onRemove={() => {
          removePoint(index);
        }}
        point={point}
      />
    </Marker>
  );
}
