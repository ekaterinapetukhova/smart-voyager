import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import { Map } from "../../../components/map/Map.tsx";
import { useTripPointAPI } from "../../../hooks/use-trip-point-api.ts";
import { Trip } from "../../../types/trip.types.ts";
import { Button } from "../../../components/common/Button.tsx";
import { PlacesList } from "./PlacesList.tsx";

interface TripMapProps {
  trip: Trip;
}

export function TripMap(props: TripMapProps) {
  const { addTripPoint, deleteTripPoint } = useTripPointAPI();

  const [showSidebar, setShowSidebar] = useState(false);
  const [clickTripId, setClickTripId] = useState<string | null>();

  const scrollToDescription = () => {
    const tripDescription = document.getElementById("tripDescription");

    tripDescription?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div id="tripMap" className="h-screen relative w-full flex justify-center">
      {showSidebar && (
        <div className="absolute left-0 bottom-0 top-0 w-sm bg-background/70 z-10 flex flex-col p-4">
          <IconChevronUp
            className="text-accent absolute right-5 top-5 cursor-pointer"
            onClick={() => {
              setShowSidebar(false);
            }}
          />
          <PlacesList
            places={props.trip.tripPoints}
            onClick={(id) => {
              setClickTripId(id);
            }}
          />
        </div>
      )}
      {!showSidebar && (
        <div className="absolute left-0 top-0 h-16 w-sm bg-background/70 z-10 flex flex-col p-4">
          <IconChevronDown
            className="text-accent absolute right-5 top-5 cursor-pointer"
            onClick={() => {
              setShowSidebar(true);
            }}
          />
          <h3 className="font-bold text-2xl text-accent">Your trip places list</h3>
        </div>
      )}
      <div className="w-24 absolute top-0 z-10">
        <Button label="Scroll to description" size="small" onClick={scrollToDescription} />
      </div>
      <Map
        points={props.trip.tripPoints}
        onRemovePoint={(id) => void deleteTripPoint(id)}
        onAddPoint={(point) => void addTripPoint({ ...point, tripId: props.trip.id })}
        activePoint={clickTripId ?? null}
        classNames="absolute inset-0"
      />
    </div>
  );
}
