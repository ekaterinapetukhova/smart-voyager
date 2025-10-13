import { TripPoint } from "../../types/trip-point.types.ts";

interface PlacesListProps {
  places: TripPoint[];
}

export function PlacesList(props: PlacesListProps) {
  const placeList = props.places.map((place) => {
    return (
      <li className="text-text">
        <span>{place.name}</span>
      </li>
    );
  });
  return <ul className="flex flex-col gap-y-4">{placeList}</ul>;
}
