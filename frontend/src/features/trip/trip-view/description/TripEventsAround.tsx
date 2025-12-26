import { IconArrowBadgeRightFilled } from "@tabler/icons-react";
import { EventAroundItem } from "../../../../types/trip.types.ts";
import { useUserStore } from "../../../../store/user-store.ts";
import { SubTitle } from "../../../../components/common/SubTitle.tsx";

interface TripEventsAround {
  events: EventAroundItem[];
}

export function TripEventsAround(props: TripEventsAround) {
  const { user } = useUserStore();

  if (!user) {
    return;
  }
  const items = props.events.map((item) => {
    return (
      <li className="flex gap-x-4 w-full text-text">
        <IconArrowBadgeRightFilled className="text-accent" />
        <div className="text-text w-full">
          <div className="flex justify-between w-full">
            <span className="font-bold">{item.name}</span>
            <span className="text-accent">{item.place}</span>
            <span className="text-accent">{item.city}</span>
            <p>{item.date}</p>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="h-full overflow-y-scroll relative w-full">
      <div className="flex justify-between">
        <SubTitle content="Events in this period" />
      </div>
      <ul className="flex flex-col gap-y-2 absolute print:relative inset-0 overflow-y-scroll mt-10 w-full divide pr-4">
        {items}
      </ul>
    </div>
  );
}
