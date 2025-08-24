import { Message } from "@/constants/types";
import { chatApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetRoomMessages = (groupId: string, receiver: string, sender: string) => {

  const getRoomMessages = async (groupId: string, receiver: string, sender: string): Promise<Message[]> => {
    const response = await chatApi.get(`/chat/message?groupId=${groupId}&receiver=${receiver}&sender=${sender}`)

    // Transform the API response to match the Message type
    const transformedMessages: Message[] = response.data.data.map((msg: any) => {
      // Convert timestamp array to ISO string
      let timestamp: string;
      try {
        timestamp = new Date(
          msg.timestamp[0], // year
          msg.timestamp[1] - 1, // month (0-indexed)
          msg.timestamp[2], // day
          msg.timestamp[3], // hour
          msg.timestamp[4], // minute
          msg.timestamp[5], // second
          msg.timestamp[6] / 1000000 // nanoseconds to milliseconds
        ).toISOString();
      } catch (error) {
        console.warn("Error parsing timestamp:", msg.timestamp, error);
        timestamp = new Date().toISOString(); // fallback to current time
      }

      const transformedMessage: Message = {
        id: msg.messageId,
        senderId: msg.senderId,
        name: msg.senderId, // You might want to fetch user names separately
        time: timestamp,
        body: msg.content,
        isOrder: false, // Set based on your business logic
        isDelivered: true, // Always delivered for fetched messages
        isSent: true // Always sent for fetched messages
      };

      return transformedMessage;
    });

    return transformedMessages;
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