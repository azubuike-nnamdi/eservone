import { chatApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetRoomMessages = (groupId: string, receiver: string, sender: string) => {
  const getRoomMessages = async (groupId: string, receiver: string, sender: string) => {
    const response = await chatApi.get(`/chat/message?groupId=${groupId}&receiver=${receiver}&sender=${sender}`)
    return response.data
  }
  const { data, isPending, error } = useQuery({
    queryKey: ['room-messages', groupId, receiver, sender],
    queryFn: () => getRoomMessages(groupId, receiver, sender),
    enabled: !!groupId && !!receiver && !!sender
  })

  return {
    data,
    isPending,
    error
  }
}

export default useGetRoomMessages