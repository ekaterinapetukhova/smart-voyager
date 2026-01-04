import { Avatar } from "../../components/common/Avatar.tsx";
import { tripGoals, tripInterest, User } from "../../types/user.types.ts";
import { useChatByMembers } from "../../hooks/use-chat.ts";
import { mapObject } from "../../utils/map-object.ts";
import { ButtonLink } from "../../components/common/ButtonLink.tsx";

interface TripMateCardProps {
  tripMate: User;
  onClick: () => void;
}

export function TripMateCard(props: TripMateCardProps) {
  const { data: chat } = useChatByMembers(props.tripMate.id);

  const goals = Object.values(
    mapObject(tripGoals, (v, key) => {
      if (props.tripMate.tripGoals.includes(key))
        return (
          <span key={key} className="px-0.5 text-background bg-accent text-[10px] font-bold">
            {v}
          </span>
        );
    })
  );

  const interests = Object.values(
    mapObject(tripInterest, (v, key) => {
      if (props.tripMate.tripInterest.includes(key))
        return (
          <span key={key} className="px-0.5 text-background bg-button-primary text-[10px] font-bold">
            {v}
          </span>
        );
    })
  );

  const spanCommonClasses = "text-sm";

  return (
    <li key={props.tripMate.id} className={chat ? "hidden" : "text-text relative p-1 transition group cursor-pointer"}>
      <div className="animate-neon-gradient bg-[200%,_200%] absolute inset-0 size-0 group-hover:size-full transition-all -z-10 bg-linear-to-r from-button-primary via-accent to-button-primary-hover"></div>

      <div className="flex flex-col bg-background transition z-20 size-full p-4 gap-y-2">
        <Avatar src={props.tripMate.avatar} />
        <div className="flex flex-col gap-y-1">
          {goals.length && <div className="flex flex-wrap gap-x-2 gap-y-1">{goals}</div>}
          {interests.length && <div className="flex flex-wrap gap-x-2 gap-y-1">{interests}</div>}
          <div className="flex flex-col gap-y-1">
            <span className="text-xl text-accent font-bold">{props.tripMate.name}</span>
            <span className={spanCommonClasses}>{props.tripMate.country}</span>
            <span className={spanCommonClasses}>{props.tripMate.city}</span>
            <span className={[spanCommonClasses, "italic"].join(" ")}>{props.tripMate.description}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-1 hidden group-hover:flex items-center justify-center bg-background/70 z-10">
        <div className="bg-background/50">
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
        </div>
      </div>
    </li>
  );
}
