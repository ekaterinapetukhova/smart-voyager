import { SubTitle } from "../../../../../components/common/SubTitle.tsx";
import { Avatar } from "../../../../../components/common/Avatar.tsx";
import { Trip } from "../../../../../types/trip.types.ts";
import { TripBlockWrapper } from "../TripBlockWrapper.tsx";

interface TripOwnerProps {
  trip: Trip;
}

export function TripOwner(props: TripOwnerProps) {
  return (
    <TripBlockWrapper>
      <SubTitle content="Owner" />
      <div className="flex gap-x-4 items-center text-text">
        <Avatar src={props.trip.user.avatar} className="size-14 rounded-full overflow-hidden" />
        <span>{props.trip.user.name}</span>
      </div>
    </TripBlockWrapper>
  );
}
