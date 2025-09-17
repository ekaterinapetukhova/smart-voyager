import { Popup, useMapEvents } from "react-leaflet";
import { ReactNode, useState } from "react";
import L from "leaflet";
import { RoutePoint } from "../../types/route-point.types";
import { getPlaceName } from "../../utils/get-place-name";
import { Button } from "../common/Button.tsx";

interface MapEventsProps {
  addRoutePoint: (point: RoutePoint) => void;
}

export const MapEvents = (props: MapEventsProps) => {
  const [popupPosition, setPopupPosition] = useState<L.LatLng | null>(null);
  const [popupContent, setPopupContent] = useState<ReactNode>(null);

  useMapEvents({
    click: (e) => {
      const latlng = e.latlng;

      // Асинхронно получаем имя места
      void (async () => {
        const name = await getPlaceName(latlng.lat, latlng.lng);

        const newRoutePoint: RoutePoint = {
          name,
          latitude: latlng.lat,
          longitude: latlng.lng,
        };

        setPopupPosition(latlng);
        setPopupContent(
          <div className="flex flex-col gap-2 items-center">
            <p className="font-semibold text-sm text-text text-center">{name}</p>
            <div className="w-1/3">
              <Button
                onClick={() => {
                  props.addRoutePoint(newRoutePoint);
                  setPopupPosition(null);
                }}
                label="Add point"
                size="medium"
              />
            </div>
          </div>
        );
      })();
    },
  });

  return popupPosition ? (
    <Popup
      className="bg-background/90 font-font shadow-[2px_1px_20px_rgba(255,9,238,0.4)]"
      position={popupPosition}
      eventHandlers={{
        remove: () => {
          setPopupPosition(null);
        },
      }}
    >
      {popupContent}
    </Popup>
  ) : null;
};
