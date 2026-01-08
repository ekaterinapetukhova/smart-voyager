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
    const formattedDate = new Date(item.date).toLocaleString().split(",")[0];

    return (
      <li className="flex gap-x-4 w-full text-text">
        <IconArrowBadgeRightFilled className="text-accent" />
        <div className="text-text w-full">
          <div className="flex flex-col gap-y-1 w-full">
            <span className="font-bold">{item.name}</span>
            <span className="text-xs">{formattedDate}</span>
            <span className="text-xs">{item.place}</span>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="h-full relative">
      <SubTitle content="Events in this period" />
      <ul className="flex flex-col gap-y-2 absolute print:relative inset-0 overflow-y-scroll top-10 w-full divide pr-4">
        {items}
      </ul>
    </div>
  );
}
