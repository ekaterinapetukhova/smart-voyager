import { Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { RoutePoint } from "../../types/route-point.types";
import { Button } from "../common/Button.tsx";
import { getPlaceData } from "../../utils/get-place-data.ts";

interface MapPopupProps {
  onAdd: (point: RoutePoint) => void;
}

export const MapPopup = (props: MapPopupProps) => {
  const [selectedPoint, setSelectedPoint] = useState<RoutePoint | null>(null);

  useMapEvents({
    click: (e) => {
      const target = e.originalEvent.target as HTMLElement;

      if (target.closest(".leaflet-popup")) return;

      const latlng = e.latlng;

      void (async () => {
        const result = await getPlaceData(latlng.lat, latlng.lng);

        if (!result) {
          return null;
        }

        if (result.name) {
          const newRoutePoint: RoutePoint = {
            name: result.name,
            latitude: latlng.lat,
            longitude: latlng.lng,
          };

          setSelectedPoint(newRoutePoint);
        }
      })();
    },
  });

  return (
    selectedPoint && (
      <Popup
        className="bg-background/90 font-font"
        position={[selectedPoint.latitude, selectedPoint.longitude]}
        eventHandlers={{
          remove: () => {
            setSelectedPoint(null);
          },
        }}
      >
        <div className="flex flex-col items-center">
          <p className="font-semibold text-sm text-text text-center">{selectedPoint.name}</p>
          <div className="w-fit">
            <Button
              onClick={() => {
                props.onAdd(selectedPoint);
                setSelectedPoint(null);
              }}
              label="Add point"
              size="medium"
            />
          </div>
        </div>
      </Popup>
    )
  );
};
