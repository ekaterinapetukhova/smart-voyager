import { useState } from "react";
import { useUserStore } from "../../../../store/user-store.ts";
import { Button } from "../../../../components/common/Button.tsx";
import { Trip } from "../../../../types/trip.types.ts";
import { SubTitle } from "../../../../components/common/SubTitle.tsx";
import { isPrint } from "../../../../utils/is-print.ts";
import { TripEvent } from "./trip-event/TripEvent.tsx";
import { TripControlListAndBudget } from "./TripControlListAndBudget.tsx";
import { TripCollaboratorsPopup } from "./trip-collaborators/TripCollaboratorsPopup.tsx";
import { TripCollaborators } from "./trip-collaborators/TripCollaborators.tsx";
import { TripOwner } from "./trip-collaborators/TripOwner.tsx";
import { TripEventForm } from "./trip-event/TripEventForm.tsx";
import { TripHeader } from "./TripHeader.tsx";
import { TripBlockWrapper } from "./TripBlockWrapper.tsx";

interface TripDescriptionProps {
  trip: Trip;
}

export function TripDescription(props: TripDescriptionProps) {
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
    <div id="tripDescription" className="h-screen print:h-fit flex flex-col items-center print:w-full">
      <div className="grow flex flex-col gap-y-4">
        <TripHeader trip={props.trip} />
        <div className="flex grow gap-x-10">
          <div className={["flex flex-col gap-y-4", isControlListEmpty ? "text-justify" : "basis-1/2"].join(" ")}>
            <TripBlockWrapper>
              <SubTitle content="Description" />
              <p className="text-text print:text-justify">{props.trip.description}</p>
            </TripBlockWrapper>
            {props.trip.event && <TripEvent from={props.trip.event.from} to={props.trip.event.to} />}
            {!props.trip.event && !isPrint() && <TripEventForm trip={props.trip} user={user} />}
            <div className="grid grid-cols-2">
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
      <div className="w-24 print:hidden">
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
