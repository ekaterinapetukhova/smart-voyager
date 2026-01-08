import { useState } from "react";
import { Container } from "../../components/common/Container.tsx";
import { useChat } from "../../hooks/use-chat.ts";
import { Chat } from "../../types/chat.types.ts";
import { useUserStore } from "../../store/user-store.ts";
import { Avatar } from "../../components/common/Avatar.tsx";
import { User } from "../../types/user.types.ts";
import { ChatWithUser } from "./ChatWithUser.tsx";

export function CommonChatView() {
  const { data: chats } = useChat();
  const { user } = useUserStore();

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);

  if (!chats) {
    return;
  }

  const chatMembers = chats.map((chat: Chat) => {
    const member = chat.members.find((m) => m.id !== user?.id);

    if (!member) {
      return null;
    }

    const lastMessage = chat.chatMessage[chat.chatMessage.length - 1];

    const time = new Date(lastMessage.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <li
        key={chat.id}
        className="w-full flex gap-x-2 items-center cursor-pointer hover:contrast-25 bg-button-primary/10 px-2 py-1"
        onClick={() => {
          setSelectedChat(chat);
          setSelectedMember(member);
        }}
      >
        <div>
          <Avatar src={member.avatar} className="size-16 rounded-full overflow-auto" />
        </div>
        <div className="flex justify-between w-full gap-x-2">
          <div className="flex flex-col justify-between h-full gap-y-2">
            <span className="text-accent font-bold text-sm xl:text-lg">{member.name}</span>
            <span className="truncate text-xs xl:text-base text-text max-w-32">{lastMessage.content}</span>
          </div>
          <span className="flex text-text text-xs xl:text-base">{time}</span>
        </div>
      </li>
    );
  });

  return (
    <Container>
      <div className="w-full flex flex-col gap-y-10 md:pt-10 pt-4 pb-2">
        <div className="flex gap-x-4">
          <ul
            className={[
              "md:w-1/4 flex-col gap-y-4 divide divide-button-primary",
              selectedChat ? "hidden md:flex" : "w-full flex",
            ].join(" ")}
          >
            {chatMembers}
          </ul>
          <div
            className={[
              "w-full md:flex flex-col gap-y-2 md:h-[88vh] scroll-smooth bg-button-primary-hover/20 p-4",
              selectedChat ? "flex h-[82vh]" : "hidden",
            ].join(" ")}
          >
            {selectedChat && selectedMember && (
              <ChatWithUser chatId={selectedChat.id} recipientId={selectedMember.id} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
