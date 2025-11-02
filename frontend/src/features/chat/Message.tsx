import { ChatMessage } from "../../types/chat.types.ts";
import { useUserStore } from "../../store/user-store.ts";

interface MessageProps {
  message: ChatMessage;
}

export function Message(props: MessageProps) {
  const { user } = useUserStore();

  const time = new Date(props.message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li
      className={[
        "flex flex-col gap-y-2 rounded w-max px-4 py-2",
        props.message.senderId === user?.id ? "ml-auto bg-gray-300" : "bg-amber-100",
      ].join(" ")}
    >
      <p>{props.message.content}</p>
      <span className="italic text-xs">{time}</span>
    </li>
  );
}
