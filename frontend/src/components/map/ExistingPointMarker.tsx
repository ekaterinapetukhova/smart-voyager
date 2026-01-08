import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { IconCancel, IconDeviceFloppy, IconEdit, IconMapPinPin, IconTrash } from "@tabler/icons-react";
import { ExistingTripPoint, TripPoint } from "../../types/trip-point.types.ts";
import MarkerIcon from "/marker.png";
import { getPlaceData } from "../../utils/get-place-data.ts";
import { useTripPointAPI } from "../../hooks/use-trip-point-api.ts";
import { TextInput } from "../common/TextInput.tsx";

interface MarkerPopupProps {
  point: ExistingTripPoint;
  onRemove: () => void;
}

interface PopupContentProps {
  point: ExistingTripPoint;
  isPlaceLocationChanged: boolean;
  shouldContentBeHidden: boolean;
  onChange: () => void;
  onFinish: () => void;
  onRemove: () => void;
  popupId: string;
}

interface PointNameProps {
  pointName: string;
  onSaveName: (newName: string) => void;
}

function PointName(props: PointNameProps) {
  const [pointName, setPointName] = useState(props.pointName);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setPointName(props.pointName);
  }, [props.pointName]);

  return (
    <>
      {editMode ? (
        <div className="flex items-center w-min gap-2">
          <TextInput
            value={pointName}
            onChange={(e) => {
              setPointName(e.target.value);
            }}
          />
          <div className="flex gap-x-1">
            <IconDeviceFloppy
              stroke={2}
              className="cursor-pointer text-text inline-block size-5 hover:text-accent transition"
              onClick={() => {
                props.onSaveName(pointName);
                setEditMode(false);
              }}
            />
            <IconCancel
              stroke={2}
              className="cursor-pointer text-text inline-block size-5  hover:text-accent transition"
              onClick={() => {
                setPointName(props.pointName);
                setEditMode(false);
              }}
            />
          </div>
        </div>
      ) : (
        <h5 className="font-semibold text-text text-center text-sm">
          {pointName}
          <IconEdit
            stroke={2}
            className="cursor-pointer text-text inline-block ml-2 size-4 -mt-1 hover:text-accent transition"
            onClick={() => {
              setEditMode(true);
            }}
          />
        </h5>
      )}
    </>
  );
}

function PopupContent(props: PopupContentProps) {
  const [tmpPoint, setTmpPoint] = useState<TripPoint | null>(null);

  const { updateTripPoint } = useTripPointAPI();

  useMapEvents({
    popupopen: (e) => {
      if (e.popup.getElement()?.className.includes(props.popupId) && props.isPlaceLocationChanged) {
        const latlng = e.popup.getLatLng();

        if (!latlng) {
          return null;
        }

        setTmpPoint(null);

        void getPlaceData(latlng.lat, latlng.lng).then((data) => {
          if (data) {
            setTmpPoint({
              name: data.name,
              fullAddress: data.fullAddress,
              longitude: latlng.lng,
              latitude: latlng.lat,
              country: data.country,
              city: data.city,
            });
          }
        });
      }
    },
  });

  async function updateName(newName: string): Promise<void> {
    await updateTripPoint({
      ...props.point,
      name: newName,
    });
  }

  const iconsClasses = "text-button-primary cursor-pointer";

  return (
    <div className="flex flex-col gap-y-2 items-center">
      <PointName
        pointName={props.isPlaceLocationChanged && tmpPoint ? tmpPoint.name : props.point.name}
        onSaveName={(n) => void updateName(n)}
      />
      <div className="flex gap-x-1 w-fit">
        {props.isPlaceLocationChanged && !props.shouldContentBeHidden ? (
          <>
            <IconDeviceFloppy
              stroke={2}
              className={iconsClasses}
              onClick={() => {
                if (tmpPoint) {
                  void updateTripPoint({ ...tmpPoint, id: props.point.id });
                }
                props.onFinish();
                setTmpPoint(null);
              }}
            />
            <IconCancel stroke={2} className={iconsClasses} onClick={props.onFinish} />
          </>
        ) : (
          <>
            <IconMapPinPin className={iconsClasses} onClick={props.onChange} />
            <IconTrash className={iconsClasses} onClick={props.onRemove} />
          </>
        )}
      </div>
    </div>
  );
}

export function ExistingPointMarker(props: MarkerPopupProps) {
  const [markerDraggable, setMarkerDraggable] = useState(false);
  const [shouldMarkerContentBeHidden, setShouldMarkerContentBeHidden] = useState(false);
  const [popupId] = useState(Math.random().toString());

  function temporarilyHideMarkerContent() {
    setShouldMarkerContentBeHidden(true);
    setTimeout(() => {
      setShouldMarkerContentBeHidden(false);
    }, 500);
  }

  const b = new L.DivIcon({
    html: `<div style="transform:translate(-50%, -100%)" class="flex flex-col gap-y-1 justify-start items-center"><p class="font-font text-sm font-bold text-center text-background bg-accent leading-4 shadow-md shadow-background/50 p-1">${props.point.name}</p><img class="size-12" src="${MarkerIcon}" alt="marker" /></div>`,
    iconSize: [120, 0],
    className: "",
    iconAnchor: [0, 0],
    popupAnchor: [0, -30],
  });

  return (
    <Marker position={[props.point.latitude, props.point.longitude]} icon={b} draggable={markerDraggable}>
      <Popup
        className={`bg-background/90 font-font ${popupId} w-max`}
        position={[props.point.latitude, props.point.longitude]}
        autoClose={false}
        closeOnClick={false}
      >
        <PopupContent
          popupId={popupId}
          point={props.point}
          isPlaceLocationChanged={markerDraggable}
          shouldContentBeHidden={shouldMarkerContentBeHidden}
          onChange={() => {
            temporarilyHideMarkerContent();
            setMarkerDraggable(true);
          }}
          onRemove={props.onRemove}
          onFinish={() => {
            setMarkerDraggable(false);
          }}
        />
      </Popup>
    </Marker>
  );
}
