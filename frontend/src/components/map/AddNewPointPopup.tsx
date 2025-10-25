import { Popup, useMapEvents } from "react-leaflet";
import { useRef, useState } from "react";
import { TripPoint } from "../../types/trip-point.types";
import { getPlaceData } from "../../utils/get-place-data.ts";
import { TextInput } from "../common/TextInput.tsx";
import { ButtonLink } from "../common/ButtonLink.tsx";

interface MapPopupProps {
  onAdd: (point: TripPoint) => void;
}

interface NewPointFormProps {
  selectedPoint: TripPoint;
  onAdd: (point: TripPoint) => void;
  onHide: () => void;
}

function NewPointForm(props: NewPointFormProps) {
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
        <ButtonLink
          size="medium"
          label="Add point"
          componentVariants={{
            button: {
              selected: true,
              onClick: () => {
                props.onAdd({ ...props.selectedPoint, name: pointName });
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export function AddNewPointPopup(props: MapPopupProps) {
  const [selectedPoint, setSelectedPoint] = useState<TripPoint | null>(null);
  const isPopupOpen = useRef(false);

  useMapEvents({
    click: (e) => {
      if (!isPopupOpen.current) {
        isPopupOpen.current = true;
      } else {
        isPopupOpen.current = false;
        setSelectedPoint(null);
        return;
      }

      const target = e.originalEvent.target as HTMLElement;

      if (!target.closest(".leaflet-zoom-animated")) return;

      const latlng = e.latlng;

      void getPlaceData(latlng.lat, latlng.lng).then((data) => {
        if (data?.name) {
          const newRoutePoint: TripPoint = {
            name: data.name,
            latitude: latlng.lat,
            longitude: latlng.lng,
            fullAddress: data.name,
          };

          setSelectedPoint(newRoutePoint);
        }
      });
    },
  });

  return (
    selectedPoint && (
      <Popup
        className="font-font shadow-none"
        position={[selectedPoint.latitude, selectedPoint.longitude]}
        closeButton={false}
      >
        <NewPointForm
          selectedPoint={selectedPoint}
          onAdd={(point) => {
            props.onAdd(point);

            setSelectedPoint(null);
          }}
          onHide={() => {
            setSelectedPoint(null);
          }}
        />
      </Popup>
    )
  );
}
