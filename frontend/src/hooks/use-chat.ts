import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authorizedFetch } from "../utils/authorized-fetch.ts";
import { Chat, ChatMessage } from "../types/chat.types.ts";
import { ValidChatMessage } from "../validation/chat.validation.ts";

const PATH = "chat";

export const useChat = () => {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: [PATH],
    queryFn: async () => {
      const { get } = authorizedFetch();

      const chats: Chat[] = await get(PATH);

      return chats;
    },
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  const sendRequest = useMutation({
    mutationFn: async (data: ValidChatMessage & { recipientId: string }) => {
      const { post } = authorizedFetch();

      const chat: Chat = await post(PATH, data);

      return chat;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PATH] }),
  });

  const sendNewMessage = useMutation({
    mutationFn: async (data: ValidChatMessage & { recipientId: string; chatId: string }) => {
      const { post } = authorizedFetch();

      const chatMessage: ChatMessage = await post(`${PATH}/${data.chatId}/message`, data);

      return chatMessage;
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: [PATH] }),
  });

  return {
    ...getAll,
    askForChat: sendRequest.mutateAsync,
    sendMessage: sendNewMessage.mutateAsync,
  };
};

export const useChatById = (chatId: string) => {
  return useQuery({
    queryKey: [PATH, chatId],
    queryFn: async () => {
      const { get } = authorizedFetch();
      const response = await get(`${PATH}/${chatId}`);

      if (!response.ok) throw new Error("Failed to fetch chat");

      return (await response.json()) as Chat;
    },

    staleTime: 5000,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
};

export const useChatByMembers = (receiverId: string) => {
  return useQuery({
    queryKey: [PATH, receiverId],
    queryFn: async () => {
      const { get } = authorizedFetch();
      const response = await get(`${PATH}/${receiverId}`);

      if (!response.ok) throw new Error("Failed to fetch chat");

      return (await response.json()) as Chat;
    },
  });
};
