import { useRef } from "react";
import { ExistingTripPoint } from "../../types/trip-point.types.ts";
import { generateGoogleMapsNavigationUrl } from "../../utils/generate-google-maps-url.ts";
import { useTripPointAPI } from "../../hooks/use-trip-point-api.ts";

interface PlacesListProps {
  places: ExistingTripPoint[];
  onClick: (id: string) => void;
}

export function PlacesList(props: PlacesListProps) {
  const firstPlaceToSwap = useRef<ExistingTripPoint | null>(null);
  const secondPlaceToSwap = useRef<ExistingTripPoint | null>(null);

  const { swapTripPoints } = useTripPointAPI();

  const placeList = props.places.map((place, index) => {
    let navigateBetween = <></>;

    if (index > 0) {
      const previousPlace = props.places[index - 1];

      const origin = previousPlace.fullAddress;
      const destination = place.fullAddress;

      const link = generateGoogleMapsNavigationUrl({ origin, destination });

      navigateBetween = (
        <a href={link} target="_blank">
          navigate between
        </a>
      );
    }

    const navigateToLink = generateGoogleMapsNavigationUrl({ destination: place.fullAddress });

    return (
      <li
        className="flex flex-col bg-accent/2 cursor-pointer"
        draggable="true"
        data-id={place.id}
        onDragStart={() => {
          firstPlaceToSwap.current = place;
        }}
        onDragEnd={() => {
          if (firstPlaceToSwap.current && secondPlaceToSwap.current) {
            void swapTripPoints({
              firstTripPointId: firstPlaceToSwap.current.id,
              secondTripPointId: secondPlaceToSwap.current.id,
            });
          }
        }}
        onDragOver={() => {
          secondPlaceToSwap.current = place;
        }}
        key={place.id}
        onClick={() => {
          props.onClick(place.id);
        }}
      >
        {navigateBetween}
        <span>
          {place.name}
          <a target="_blank" href={navigateToLink}>
            nav to
          </a>
        </span>
      </li>
    );
  });
  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="font-bold text-2xl text-accent">Your trip places list</h3>
      <div className="flex gap-x-4">
        <div className="h-full w-0.5 bg-accent"></div>
        <ul className="flex flex-col gap-y-4 text-text">{placeList}</ul>
      </div>
    </div>
  );
}
