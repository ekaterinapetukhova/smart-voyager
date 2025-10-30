import { useState } from "react";
import { IconLocationFilled, IconRoute } from "@tabler/icons-react";
import { ExistingTripPoint } from "../../../../types/trip-point.types.ts";
import { generateGoogleMapsNavigationUrl } from "../../../../utils/generate-google-maps-url.ts";
import { useTripPointAPI } from "../../../../hooks/use-trip-point-api.ts";

interface PlacesListProps {
  places: ExistingTripPoint[];
  onClick: (id: string) => void;
}

export function PlacesList(props: PlacesListProps) {
  const [firstPlaceToSwap, setFirstPlaceToSwap] = useState<ExistingTripPoint | null>(null);
  const [secondPlaceToSwap, setSecondPlaceToSwap] = useState<ExistingTripPoint | null>(null);

  const { swapTripPoints } = useTripPointAPI();

  const placeList = props.places.map((place, index) => {
    let navigateBetween = <></>;

    if (index > 0) {
      const previousPlace = props.places[index - 1];

      const origin = previousPlace.fullAddress;
      const destination = place.fullAddress;

      const link = generateGoogleMapsNavigationUrl({ origin, destination });

      navigateBetween = (
        <div className="absolute pb-6 flex items-center gap-2 -top-[12px]">
          <a
            className="bg-accent text-background rounded-full size-6 flex items-center justify-center"
            target="_blank"
            href={link}
          >
            <IconRoute size={16} />
          </a>
        </div>
      );
    }

    const navigateToLink = generateGoogleMapsNavigationUrl({ destination: place.fullAddress });

    return (
      <li
        className={[
          "flex flex-col text-text text-sm relative",
          index === 0 ? "pb-10" : index === props.places.length - 1 ? "pt-10" : "py-10",
        ].join(" ")}
        data-id={place.id}
        onDragStart={() => {
          setFirstPlaceToSwap(place);
        }}
        onDragEnd={() => {
          if (firstPlaceToSwap && secondPlaceToSwap) {
            void swapTripPoints({
              firstTripPointId: firstPlaceToSwap.id,
              secondTripPointId: secondPlaceToSwap.id,
            }).then(() => {
              setFirstPlaceToSwap(null);
              setSecondPlaceToSwap(null);
            });
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();

          if (secondPlaceToSwap?.id !== place.id && firstPlaceToSwap?.id !== place.id) {
            setSecondPlaceToSwap(place);
          }
        }}
        onDragLeave={() => {
          setSecondPlaceToSwap(null);
        }}
        key={place.id}
      >
        <div
          className={[
            "absolute w-0.5 bg-accent left-[11px] top-6 -z-10",
            index !== props.places.length - 1 ? "h-full" : "h-1/2",
          ].join(" ")}
        ></div>
        {navigateBetween}
        <div className="flex items-center gap-x-2">
          <a
            className="bg-accent text-background rounded-full size-6 min-w-6 flex items-center justify-center pt-[1px] pr-[1px]"
            target="_blank"
            href={navigateToLink}
          >
            <IconLocationFilled size={19} />
          </a>
          <span
            draggable="true"
            className={[
              "cursor-pointer flex flex-col transition-all text-text text-sm",
              place.id === firstPlaceToSwap?.id && "opacity-30",
              place.id === secondPlaceToSwap?.id && "bg-button-primary-hover",
            ].join(" ")}
            onClick={() => {
              props.onClick(place.id);
            }}
          >
            {place.name}
          </span>
        </div>
      </li>
    );
  });

  return (
    <div className="flex flex-col gap-y-4 h-full max-h-full">
      <h2 className="font-bold text-2xl text-accent">Your trip places list</h2>
      <div className="relative h-full w-full">
        <ul className="absolute inset-0 overflow-y-scroll flex flex-col">{placeList}</ul>
      </div>
    </div>
  );
}
