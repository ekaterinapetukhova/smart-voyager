import { useEffect, useRef } from "react";
import { Form } from "../../components/common/form/Form.tsx";
import { validChatMessageSchema } from "../../validation/chat.validation.ts";
import { useChat, useChatById } from "../../hooks/use-chat.ts";
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

  useEffect(() => {
    scrollToBottom();
  }, [chat?.chatMessage]);

  console.log(chat);

  return (
    <>
      {chat?.chatMessage && (
        <ul className="w-full overflow-y-auto grow flex flex-col gap-y-6" ref={messagesContainerRef}>
          {chat.chatMessage.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </ul>
      )}
      <Form
        fields={{
          content: { value: "", type: "text" },
        }}
        checkValidation={validChatMessageSchema.parse}
        sendRequest={async (data) => {
          await sendMessage({
            recipientId: props.recipientId,
            content: data.content,
            chatId: props.chatId,
          });

          data.content = "";

          scrollToBottom();
        }}
        buttonText="Send"
        formClassNames="items-center w-full flex-row"
        hiddenLabel={true}
      />
    </>
  );
}
