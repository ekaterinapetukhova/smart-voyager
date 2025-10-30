import { IconArrowBadgeRightFilled } from "@tabler/icons-react";
import { ControlListItem } from "../../../../types/trip.types.ts";
import { useUserStore } from "../../../../store/user-store.ts";
import { SubTitle } from "../../../../components/common/SubTitle.tsx";

interface ControlListProps {
  controlListItems: ControlListItem[];
}

export function ControlListAndBudget(props: ControlListProps) {
  const { user } = useUserStore();

  if (!user) {
    return;
  }

  const budget = props.controlListItems.reduce((acc, item) => acc + item.cost, 0);

  const currency = user.currency.toUpperCase();

  const items = props.controlListItems.map((item) => {
    return (
      <li className="flex gap-x-4 w-full">
        <IconArrowBadgeRightFilled className="text-accent" />
        <div className="text-text w-full">
          <div className="flex justify-between w-full">
            <span className="font-bold">{item.name}</span>
            <span className="ml-auto">
              <span className="text-accent">{item.cost}</span> {currency}
            </span>
          </div>
          <p>{item.description}</p>
        </div>
      </li>
    );
  });

  return (
    <div className="h-full overflow-y-scroll relative w-full">
      <div className="flex justify-between text-lg w-full">
        <SubTitle content="Control list" />
        <div className="flex text-text gap-x-2">
          <SubTitle content="Total budget needed:" />
          <span className="flex gap-x-2">
            <span className="text-accent">{budget}</span> <span>{currency}</span>
          </span>
        </div>
      </div>
      <ul className="flex flex-col gap-y-2 absolute inset-0 overflow-y-scroll mt-10 w-full divide">{items}</ul>
    </div>
  );
}
