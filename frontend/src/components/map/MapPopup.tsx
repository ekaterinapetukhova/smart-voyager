import { Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { TripPoint } from "../../types/trip-point.types";
import { Button } from "../common/Button.tsx";
import { getPlaceData } from "../../utils/get-place-data.ts";
import { TextInput } from "../common/TextInput.tsx";

interface MapPopupProps {
  onAdd: (point: TripPoint) => void;
}

interface NewPointFormProps {
  selectedPoint: TripPoint;
  onAdd: (point: TripPoint) => void;
  onHide: () => void;
}

const NewPointForm = (props: NewPointFormProps) => {
  const [pointName, setPointName] = useState(props.selectedPoint.name);

  return (
    <div className="flex flex-col items-center gap-y-2 bg-background/90 rounded p-4 -m-3 w-fit relative">
      <span
        className={"text-text absolute right-2 top-2 removal-button cursor-pointer"}
        onClick={() => {
          props.onHide();
        }}
      >
        X
      </span>
      <TextInput
        value={pointName}
        onChange={(e) => {
          setPointName(e.target.value);
        }}
      />
      <div className="w-fit">
        <Button
          onClick={() => {
            props.onAdd({ ...props.selectedPoint, name: pointName });
          }}
          label="Add point"
          size="medium"
        />
      </div>
    </div>
  );
};

export const MapPopup = (props: MapPopupProps) => {
  const [selectedPoint, setSelectedPoint] = useState<TripPoint | null>(null);

  useMapEvents({
    click: (e) => {
      const target = e.originalEvent.target as HTMLElement;

      if (target.closest(".leaflet-popup") || target.closest(".removal-button")) return;

      const latlng = e.latlng;

      void (async () => {
        const result = await getPlaceData(latlng.lat, latlng.lng);

        if (!result) {
          return null;
        }

        if (result.name) {
          const newRoutePoint: TripPoint = {
            name: result.name,
            latitude: latlng.lat,
            longitude: latlng.lng,
            fullAddress: result.name,
          };

          setSelectedPoint(newRoutePoint);
        }
      })();
    },
  });

  return (
    selectedPoint && (
      <>
        <Popup
          className="font-font shadow-none"
          position={[selectedPoint.latitude, selectedPoint.longitude]}
          closeButton={false}
          // eventHandlers={{
          //   remove: () => {
          //     setSelectedPoint(null);
          //   },
          // }}
        >
          <NewPointForm
            selectedPoint={selectedPoint}
            onAdd={props.onAdd}
            onHide={() => {
              setSelectedPoint(null);
            }}
          />
        </Popup>
      </>
    )
  );
};
