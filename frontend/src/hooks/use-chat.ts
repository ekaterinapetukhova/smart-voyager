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
      const request = authorizedFetch();

      const chats: Chat[] = await request({ path: PATH, method: "GET" });

      return chats;
    },
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  const sendRequest = useMutation({
    mutationFn: async (data: ValidChatMessage & { recipientId: string }) => {
      const request = authorizedFetch();

      const chat: Chat = await request({ path: PATH, method: "POST", data });

      return chat;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PATH] }),
  });

  const sendNewMessage = useMutation({
    mutationFn: async (data: ValidChatMessage & { recipientId: string; chatId: string }) => {
      const request = authorizedFetch();

      const chatMessage: ChatMessage = await request({
        path: `${PATH}/${data.chatId}/message`,
        method: "POST",
        data,
      });

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
      const request = authorizedFetch();
      const chat: Chat = await request({
        path: `${PATH}/${chatId}`,
        method: "GET",
      });

      return chat;
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
      const request = authorizedFetch();
      const chat: Chat = await request({
        path: `${PATH}/${receiverId}`,
        method: "GET",
      });

      return chat;
    },
  });
};
