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
        className="w-full flex gap-x-2 items-center cursor-pointer hover:contrast-25"
        onClick={() => {
          setSelectedChat(chat);
          setSelectedMember(member);
        }}
      >
        <div>
          <Avatar src={member.avatar} className="size-16 rounded-full overflow-auto" />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-y-1">
            <span className="text-accent font-bold text-lg">{member.name}</span>
            <span className="truncate text-text w-32">{lastMessage.content}</span>
          </div>
          <span className="flex text-text">{time}</span>
        </div>
      </li>
    );
  });

  return (
    <Container>
      <div className="w-full flex flex-col gap-y-10 pt-10">
        <div className="flex gap-x-4">
          <ul className="w-1/4 flex flex-col gap-y-4">{chatMembers}</ul>
          <div className="w-full flex flex-col gap-y-2 h-[88vh] scroll-smooth bg-button-primary-hover/20 p-4">
            {selectedChat && selectedMember && (
              <ChatWithUser chatId={selectedChat.id} recipientId={selectedMember.id} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
