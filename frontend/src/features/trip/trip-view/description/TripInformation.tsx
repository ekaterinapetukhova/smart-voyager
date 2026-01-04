import { useState } from "react";
import { useUserStore } from "../../../../store/user-store.ts";
import { Button } from "../../../../components/common/Button.tsx";
import { Trip } from "../../../../types/trip.types.ts";
import { TripControlListAndBudget } from "./TripControlListAndBudget.tsx";
import { TripCollaboratorsPopup } from "./trip-collaborators/TripCollaboratorsPopup.tsx";
import { TripCollaborators } from "./trip-collaborators/TripCollaborators.tsx";
import { TripOwner } from "./trip-collaborators/TripOwner.tsx";
import { TripEvent } from "./TripEvent.tsx";
import { TripHeader } from "./TripHeader.tsx";
import { TripDescription } from "./TripDescription.tsx";

interface TripDescriptionProps {
  trip: Trip;
}

export function TripInformation(props: TripDescriptionProps) {
  const [addCollaborationPopupVisible, setCollaborationPopupVisible] = useState(false);

  const scrollToMap = () => {
    const tripMap = document.getElementById("tripMap");

    tripMap?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const { user } = useUserStore();

  if (!user) {
    return;
  }

  const isControlListEmpty = props.trip.controlList.length === 0;

  return (
    <div
      id="tripDescription"
      className="h-full md:h-screen print:h-fit flex flex-col items-center print:w-full pt-6 md:pt-10"
    >
      <div className="grow flex flex-col gap-y-4 w-full">
        <TripHeader trip={props.trip} />
        <div className="flex grow gap-x-10">
          <div
            className={["flex flex-col gap-y-4 w-full", isControlListEmpty ? "text-justify" : "basis-1/2"].join(" ")}
          >
            <TripDescription description={props.trip.description} tripId={props.trip.id} />
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-y-4">
              <TripEvent trip={props.trip} />
              <TripOwner trip={props.trip} />
              <TripCollaborators
                onPopupOpen={() => {
                  setCollaborationPopupVisible(true);
                }}
                trip={props.trip}
                user={user}
              />
            </div>
          </div>
          {!isControlListEmpty && (
            <div className="basis-1/2 flex flex-col w-full">
              <TripControlListAndBudget controlListItems={props.trip.controlList} />
            </div>
          )}
        </div>
      </div>
      <div className="w-24 print:hidden hidden md:flex">
        <Button label="Scroll to map" size="small" onClick={scrollToMap} />
      </div>
      {addCollaborationPopupVisible && (
        <TripCollaboratorsPopup
          onClose={() => {
            setCollaborationPopupVisible(false);
          }}
          trip={props.trip}
          user={user}
        />
      )}
    </div>
  );
}
