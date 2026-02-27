import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { SubTitle } from "../../../../../components/common/SubTitle.tsx";
import { Avatar } from "../../../../../components/common/Avatar.tsx";
import { Trip } from "../../../../../types/trip.types.ts";
import { User } from "../../../../../types/user.types.ts";
import { useTripApi } from "../../../../../hooks/use-trip-api.ts";
import { TripBlockWrapper } from "../TripBlockWrapper.tsx";

interface TripCollaboratorsProps {
  trip: Trip;
  user: User;
  onPopupOpen: () => void;
  listClassNames?: string;
}

export function TripCollaborators(props: TripCollaboratorsProps) {
  const { removeTripMate } = useTripApi();

  const collaborators = props.trip.collaborators.map((mate) => {
    return (
      <div className="flex gap-x-2 items-center text-text w-full" key={mate.id}>
        <Avatar src={mate.avatar} className="size-14 rounded-full mr-2 overflow-hidden" />
        <span>{mate.name}</span>
        {props.user.id === props.trip.user.id && (
          <IconTrash
            className="cursor-pointer ml-auto  text-text hover:text-accent"
            onClick={() => {
              void removeTripMate.mutateAsync({ tripId: props.trip.id, mateId: mate.id });
            }}
          />
        )}
      </div>
    );
  });

  return (
    <TripBlockWrapper>
      <div className="flex gap-x-2 items-center">
        <SubTitle content="Mates" />{" "}
        {props.user.id === props.trip.user.id && (
          <IconCirclePlus
            stroke={2}
            className="cursor-pointer text-text size-5 hover:text-accent"
            onClick={props.onPopupOpen}
          />
        )}
      </div>
      <div className={["flex flex-col gap-y-2 overflow-y-auto", props.listClassNames ?? ""].join(" ")}>
        {collaborators}
      </div>
    </TripBlockWrapper>
  );
}
