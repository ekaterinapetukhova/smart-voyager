import { Container } from "../../components/common/Container.tsx";
import { useChat } from "../../hooks/use-chat.ts";

export function ChatView() {
  const { data: chats } = useChat();

  return (
    <section>
      <Container>{chats?.length}</Container>
    </section>
  );
}
