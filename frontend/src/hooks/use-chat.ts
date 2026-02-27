import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authorizedFetch } from "../utils/authorized-fetch.ts";
import { Chat, ChatMessage } from "../types/chat.types.ts";
import { ValidChatMessage } from "../validation/chat.validation.ts";

// Wspólny endpoint API dla operacji związanych z czatem

const path = "chat";

//  Własny hook odpowiedzialny za obsługę komunikacji z API czatów

export const useChat = () => {
  // Hook do zarządzania i aktualizacji cache

  const queryClient = useQueryClient();

  // Zapytanie pobierające wszystkie czaty użytkownika z backendu

  const getAll = useQuery({
    queryKey: [path],
    queryFn: async () => {
      const request = authorizedFetch();

      const chats: Chat[] = await request({ path: path, method: "GET" });

      return chats;
    },
    refetchInterval: 5000, // ponowne pobieranie danych co 5 sekund
    refetchIntervalInBackground: true, // odświeżanie również w tle
  });

  // Mutacja odpowiedzialna za utworzenie nowego czatu

  const sendRequest = useMutation({
    mutationFn: async (data: ValidChatMessage & { recipientId: string }) => {
      const request = authorizedFetch();

      const chat: Chat = await request({ path: path, method: "POST", data });

      return chat;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [path] }), // po poprawnym utworzeniu czatu cache zostaje odświeżony
  });

  // Mutacja odpowiedzialna za wysyłanie nowej wiadomości w istniejącym czacie

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
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: [path] }), // po wysłaniu wiadomości lista czatów zostaje zaktualizowana
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
        path: `${path}/by-receiver/${receiverId}`,
        method: "GET",
      });
      return chat;
    },
  });
};
