import { chatApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetMessageByChatId = (chatId: string) => {
  const getMessageByChatId = async (chatId: string) => {
    const response = await chatApi.get(`chat/message/get-chat-by-id?chatId=${chatId}`)
    return response.data
  }
  const { data, isPending, error } = useQuery({
    queryKey: ['room-messages', chatId],
    queryFn: () => getMessageByChatId(chatId),
    enabled: !!chatId
  })
  return { data, isPending, error }
}