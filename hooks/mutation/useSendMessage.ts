import { useToast } from "@/context/toast-context";
import { chatApi } from "@/lib/api";

import { useMutation } from "@tanstack/react-query";

interface SendMessagePayload {
  content: string;
  contentType: string;
  groupId: string;
  recipientId: string;
  sender: string;
}

interface SendMessageOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

const useSendMessage = () => {
  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SendMessagePayload) => chatApi.post(`/chat/message/send`, payload),
    onSuccess: (data) => {
      console.log("Message sent successfully:", data)
      // showToast("Message sent successfully", "success")
    },
    onError: (error: { response: { data: { description: string } } }) => {
      console.error("Error sending message:", error)
      // showToast(error?.response?.data?.description ?? "Failed to send message", "error")
    }
  })

  const handleSendMessage = (payload: SendMessagePayload, options?: SendMessageOptions) => {
    mutate(payload, {
      onSuccess: () => {
        options?.onSuccess?.();
      },
      onError: () => {
        options?.onError?.();
      }
    })
  }

  return { handleSendMessage, isPending }
}

export default useSendMessage 