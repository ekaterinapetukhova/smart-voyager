import { ChatMessage } from "../../types/chat.types.ts";

interface MessageProps {
  message: ChatMessage;
}

export function Message(props: MessageProps) {
  const time = new Date(props.message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li className="flex flex-col gap-y-2">
      <p>{props.message.content}</p>
      <span className="italic text-xs">{time}</span>
    </li>
  );
}
