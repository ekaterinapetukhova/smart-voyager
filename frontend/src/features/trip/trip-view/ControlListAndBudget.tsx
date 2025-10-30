import { ControlListItem } from "../../../types/trip.types.ts";
import { useUserStore } from "../../../store/user-store.ts";

interface ControlListProps {
  controlListItems: ControlListItem[];
}

export function ControlListAndBudget(props: ControlListProps) {
  const { user } = useUserStore();

  const budget = props.controlListItems.reduce((acc, item) => acc + item.cost, 0);

  const items = props.controlListItems.map((item) => {
    return (
      <li className="text-text">
        <span className="font-bold">{item.name}</span>
        <p>{item.description}</p>
        <span>
          <span className="text-accent">{item.cost}</span> {user?.currency}
        </span>
      </li>
    );
  });

  return (
    <div className="h-full overflow-y-scroll">
      <ul className="list-outside list-disc flex flex-col gap-y-2">{items}</ul>
      <div className="flex text-text gap-x-2 pt-2 mt-2 border-t-2 border-gray-500">
        <h3>Total budget needed: </h3>
        <span className="flex gap-x-2">
          <span className="text-accent">{budget}</span> <span>{user?.currency}</span>
        </span>
      </div>
    </div>
  );
}
