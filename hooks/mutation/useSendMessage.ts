import { Message, SendMessageOptions, SendMessagePayload } from "@/constants/types";
import { chatApi } from "@/lib/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useSendMessage = () => {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<Message[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SendMessagePayload) => chatApi.post(`/chat/message/send`, payload),
    onSuccess: (data) => {
      // Clear optimistic messages since they're now confirmed by server
      setMessages([]);
      queryClient.invalidateQueries({ queryKey: ["room-messages"] });
    },
    onError: (error: { response: { data: { description: string } } }) => {
      console.error("Error sending message:", error);
    }
  });

  const handleSendMessage = (
    payload: SendMessagePayload,
    optimisticMessage: Message,
    options?: SendMessageOptions
  ) => {
    // Add message optimistically
    setMessages(prev => [...prev, optimisticMessage]);

    // Update message status to sent
    setMessages(prev =>
      prev.map(msg =>
        msg.id === optimisticMessage.id
          ? { ...msg, isSent: true }
          : msg
      )
    );

    mutate(payload, {
      onSuccess: () => {
        // Update message status to delivered
        setMessages(prev =>
          prev.map(msg =>
            msg.id === optimisticMessage.id
              ? { ...msg, isDelivered: true }
              : msg
          )
        );
        options?.onSuccess?.();
      },
      onError: () => {
        // Remove the optimistic message on error
        setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
        options?.onError?.();
      }
    });
  };

  return {
    handleSendMessage,
    isPending,
    messages,
    setMessages
  };
};

export default useSendMessage; 