import { Avatar } from "../../components/common/Avatar.tsx";
import { User } from "../../types/user.types.ts";
import { useChatByMembers } from "../../hooks/use-chat.ts";
import { ButtonLink } from "../../components/common/ButtonLink.tsx";

interface TripMateCardProps {
  tripMate: User;
  onClick: () => void;
}

export function TripMateCard(props: TripMateCardProps) {
  const { data: chat } = useChatByMembers(props.tripMate.id);

  return (
    <li className={chat?.id ? "hidden" : "flex flex-col items-center"}>
      <Avatar src={props.tripMate.avatar} className="size-20" />
      <span>{props.tripMate.name}</span>
      <span>{props.tripMate.surname}</span>
      <span>{props.tripMate.description}</span>
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
