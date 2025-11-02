import { Popup } from "../../../../../components/common/Popup.tsx";
import { SubTitle } from "../../../../../components/common/SubTitle.tsx";
import { Avatar } from "../../../../../components/common/Avatar.tsx";
import { useChat } from "../../../../../hooks/use-chat.ts";
import { Trip } from "../../../../../types/trip.types.ts";
import { User } from "../../../../../types/user.types.ts";
import { useTripApi } from "../../../../../hooks/use-trip-api.ts";

interface TripCollaborationsPopupProps {
  onClose: () => void;
  trip: Trip;
  user: User;
}

export function TripCollaboratorsPopup(props: TripCollaborationsPopupProps) {
  const chat = useChat();
  const { addTripMate } = useTripApi();

  const availableMates: { id: string; avatar: string; name: string }[] = [];

  if (chat.data) {
    for (const c of chat.data) {
      for (const m of c.members) {
        if (
          !availableMates.find((x) => x.id === m.id) &&
          m.id !== props.user.id &&
          m.id !== props.trip.user.id &&
          !props.trip.collaborators.find((e) => e.id === m.id)
        ) {
          availableMates.push({
            id: m.id,
            avatar: m.avatar,
            name: m.name,
          });
        }
      }
    }
  }

  return (
    <Popup closePopup={props.onClose} containerClassName="w-1/4 h-2/3">
      <SubTitle content="Available trip mates" />
      <ul className="flex flex-col gap-y-4">
        {availableMates.map((mate) => {
          return (
            <li
              className="flex gap-x-2 text-text items-center cursor-pointer hover:bg-text/10"
              onClick={() => {
                void addTripMate.mutateAsync({ tripId: props.trip.id, mateId: mate.id }).then(() => {
                  props.onClose();
                });
              }}
            >
              <Avatar src={mate.avatar} className="size-14 rounded-full" />
              <span>{mate.name}</span>
            </li>
          );
        })}
      </ul>
    </Popup>
  );
}
