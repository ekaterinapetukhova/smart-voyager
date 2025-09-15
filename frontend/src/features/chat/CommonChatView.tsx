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

  const chatMembers = chats?.map((chat: Chat) => {
    const member = chat.members.find((m) => m.id !== user?.id);

    if (!member) {
      return null;
    }

    console.log(member.avatar);

    const lastMessage = chat.chatMessage[chat.chatMessage.length - 1];

    return (
      <li
        key={chat.id}
        className="w-full flex gap-x-4 items-center cursor-pointer hover:contrast-25"
        onClick={() => {
          setSelectedChat(chat);
          setSelectedMember(member);
        }}
      >
        <Avatar src={member.avatar} className="size-14 rounded-full" />
        <div className="flex flex-col">
          <span>{member.name}</span>
          <span className="truncate">{lastMessage.content}</span>
        </div>
      </li>
    );
  });

  return (
    <Container>
      <div className="w-full flex">
        <ul className="w-1/4 flex flex-col gap-y-4">{chatMembers}</ul>
        <div className="w-full flex flex-col gap-y-2 h-[80vh] scroll-smooth">
          {selectedChat && selectedMember && <ChatWithUser chatId={selectedChat.id} recipientId={selectedMember.id} />}
        </div>
      </div>
    </Container>
  );
}
