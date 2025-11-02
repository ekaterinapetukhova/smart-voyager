import { Avatar } from "../../components/common/Avatar.tsx";
import { tripGoals, User } from "../../types/user.types.ts";
import { useChatByMembers } from "../../hooks/use-chat.ts";
import { ButtonLink } from "../../components/common/ButtonLink.tsx";
import { mapObject } from "../../utils/map-object.ts";

interface TripMateCardProps {
  tripMate: User;
  onClick: () => void;
}

export function TripMateCard(props: TripMateCardProps) {
  const { data: chat } = useChatByMembers(props.tripMate.id);

  console.log(chat);

  const goals = Object.values(
    mapObject(tripGoals, (v, key) => {
      if (props.tripMate.tripGoals.includes(key)) return <span className="text-accent">{v}</span>;
    })
  );

  // const tripGoals = props.tripMate.tripGoals.map((goal) => {
  //   return <span className="block">{goal}</span>;
  // });

  return (
    <li
      className={
        chat ? "hidden" : "flex flex-col items-center text-text gap-y-4 relative h-96 py-8 hover:scale-105 transition"
      }
    >
      <div className="size-full absolute opacity-20 bg-button-primary-hover top-0 left-0 -z-10"></div>
      <Avatar src={props.tripMate.avatar} className="size-40" />
      <span>{props.tripMate.name}</span>
      <span>{props.tripMate.description}</span>
      <div className="flex flex-wrap gap-x-2">{goals}</div>
      <ButtonLink
        size="medium"
        label="Ask for Chat"
        componentVariants={{
          button: {
            selected: true,
            onClick: () => {
              props.onClick();
            },
          },
        }}
      />
    </li>
  );
}
