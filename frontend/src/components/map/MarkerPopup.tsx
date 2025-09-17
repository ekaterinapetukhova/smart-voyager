import { Popup } from "react-leaflet";
import { RoutePoint } from "../../types/route-point.types.ts";
import { Button } from "../common/Button.tsx";

interface MarkerPopupProps {
  point: RoutePoint;
  onRemove: () => void;
}

export function MarkerPopup(props: MarkerPopupProps) {
  return (
    <Popup className="bg-background/90 font-font" position={[props.point.latitude, props.point.longitude]}>
      <div className="flex flex-col items-center">
        <p className="font-semibold text-sm text-text text-center">{props.point.name}</p>
        <div className="w-fit">
          <Button onClick={props.onRemove} label="Remove point" size="medium" />
        </div>
      </div>
    </Popup>
  );
}
