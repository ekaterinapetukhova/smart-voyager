import { useEffect, useRef } from "react";
import { validChatMessageSchema } from "../../validation/chat.validation.ts";
import { useChat, useChatById } from "../../hooks/use-chat.ts";
import { Input, useForm } from "../../components/common/form/useForm.tsx";
import { Button } from "../../components/common/Button.tsx";
import { updateUserStore } from "../../store/user-store.ts";
import { Message } from "./Message.tsx";

interface ChatWithUserProps {
  chatId: string;
  recipientId: string;
}

export function ChatWithUser(props: ChatWithUserProps) {
  const { data: chat } = useChatById(props.chatId);
  const { sendMessage } = useChat();

  const messagesContainerRef = useRef<HTMLUListElement | null>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const form = useForm({
    initialData: {
      content: "",
    },
    validation: validChatMessageSchema,
  });

  useEffect(() => {
    scrollToBottom();
  }, [chat?.chatMessage]);

  return (
    <>
      {chat?.chatMessage && (
        <ul className="w-full overflow-y-auto grow flex flex-col gap-y-6" ref={messagesContainerRef}>
          {chat.chatMessage.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </ul>
      )}
      <div>
        <Input type="textarea" form={form} fieldKey="content" />
        <div className="w-1/5 mx-auto">
          <Button
            label="Send"
            size="large"
            onClick={async () => {
              if (form.isValid) {
                await sendMessage({ content: form.data.content, recipientId: props.recipientId, chatId: props.chatId });

                void updateUserStore();
                scrollToBottom();
              }

              form.data.content = "";
            }}
          />
        </div>
      </div>
    </>
  );
}
