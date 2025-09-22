import { Message } from "@/constants/types";
import { chatApi } from "@/lib/api";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

export const useGetRoomMessages = (groupId: string, receiver: string, sender: string) => {
  const isFocusedRef = useRef(true);

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

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['room-messages', groupId, receiver, sender],
    queryFn: () => getRoomMessages(groupId, receiver, sender),
    enabled: !!groupId && !!receiver && !!sender,
    refetchInterval: () => {
      // Only poll when the screen is focused
      return isFocusedRef.current ? 2000 : false; // 2 seconds when focused, no polling when not focused
    },
    refetchIntervalInBackground: false, // Don't poll in background to save battery
    refetchOnWindowFocus: true, // Refetch when user returns to the app
    staleTime: 0, // Always consider data stale to ensure fresh messages
  })

  // Handle screen focus to control polling
  useFocusEffect(
    useCallback(() => {
      isFocusedRef.current = true;
      // Refetch immediately when screen comes into focus
      refetch();

      return () => {
        isFocusedRef.current = false;
      };
    }, [refetch])
  );

  return {
    data,
    isPending,
    error,
    refetch
  }
}

export default useGetRoomMessages