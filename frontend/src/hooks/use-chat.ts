import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authorizedFetch } from "../utils/authorized-fetch.ts";
import { Chat, ChatMessage } from "../types/chat.types.ts";
import { ValidChatMessage } from "../validation/chat.validation.ts";

const path = "chat";

export const useChat = () => {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: [path],
    queryFn: async () => {
      const request = authorizedFetch();

      const chats: Chat[] = await request({ path: path, method: "GET" });

      return chats;
    },
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  const sendRequest = useMutation({
    mutationFn: async (data: ValidChatMessage & { recipientId: string }) => {
      const request = authorizedFetch();

      const chat: Chat = await request({ path: path, method: "POST", data });

      return chat;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [path] }),
  });

  const sendNewMessage = useMutation({
    mutationFn: async (data: ValidChatMessage & { recipientId: string; chatId: string }) => {
      const request = authorizedFetch();

      const chatMessage: ChatMessage = await request({
        path: `${path}/${data.chatId}/message`,
        method: "POST",
        data,
      });

      return chatMessage;
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: [path] }),
  });

  return {
    ...getAll,
    askForChat: sendRequest.mutateAsync,
    sendMessage: sendNewMessage.mutateAsync,
  };
};

export const useChatById = (chatId: string) => {
  return useQuery({
    queryKey: [path, chatId],
    queryFn: async () => {
      const request = authorizedFetch();
      const chat: Chat = await request({
        path: `${path}/${chatId}`,
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
    queryKey: [path, receiverId],
    queryFn: async () => {
      const request = authorizedFetch();

      const chat: Chat = await request({
        path: `${path}/${receiverId}`,
        method: "GET",
      });

      console.log(chat.id);

      return chat;
    },
  });
};
