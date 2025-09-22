import { Message } from '@/constants/types';
import useSendMessage from '@/hooks/mutation/useSendMessage';
import useGetRoomMessages from '@/hooks/query/useGetRoomMessages';
import { useAuthStore } from '@/store/auth-store';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export const useMessageRoomLogic = () => {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const userEmail = params.userEmail as string;
  const receiverEmail = params.receiverEmail as string;

  const [input, setInput] = useState("");
  const user = useAuthStore((state) => state.user);
  const { handleSendMessage, isPending: isSendingMessage, messages: optimisticMessages } = useSendMessage();

  // Dynamically determine the recipient based on current user's role
  const getRecipientEmail = () => {
    if (!user || !userEmail || !receiverEmail) return '';

    // If current user is the service seeker (userEmail), recipient is service provider
    if (user.email === userEmail) {
      return receiverEmail; // Send to service provider
    }
    // If current user is the service provider (receiverEmail), recipient is service seeker
    else if (user.email === receiverEmail) {
      return userEmail; // Send to service seeker
    }

    return receiverEmail;
  };

  const recipientEmail = getRecipientEmail();

  const { data, isPending, error, refetch } = useGetRoomMessages(id, recipientEmail, user?.email || '');

  // Combine server messages with optimistic messages and sort by timestamp
  const getDisplayedMessages = () => {
    const allMessages = [...(Array.isArray(data) ? data : []), ...optimisticMessages];

    try {
      return allMessages.sort((a, b) => {
        const timeA = new Date(a.time).getTime();
        const timeB = new Date(b.time).getTime();
        return timeA - timeB;
      });
    } catch (error) {
      console.error("Error sorting messages:", error);
      return allMessages;
    }
  };

  const handleSendMessagePress = async () => {
    if (!input.trim() || !id || !user || !userEmail || !receiverEmail) return;

    const messageText = input.trim();
    const currentTime = new Date().toISOString();

    // Create optimistic message
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      senderId: user.email,
      name: user.firstName,
      time: currentTime,
      body: messageText,
      isSent: false,
      isDelivered: false
    };

    setInput("");

    const payload = {
      content: messageText,
      contentType: "text",
      groupId: id,
      recipientId: recipientEmail,
      sender: user.email
    };

    // console.log("Sending message with payload:", payload);
    // console.log("Current user:", user.email);
    // console.log("Recipient email:", recipientEmail);

    handleSendMessage(payload, optimisticMessage);
  };

  return {
    // Params
    id,
    userEmail,
    receiverEmail,

    // State
    input,
    setInput,

    // User
    user,

    // Messages
    displayedMessages: getDisplayedMessages(),

    // Loading states
    isPending,
    isSendingMessage,

    // Error
    error,

    // Actions
    handleSendMessagePress,
    refetchMessages: refetch,

    // Debug info
    recipientEmail,
    debugInfo: {
      currentUser: user?.email,
      urlUserEmail: userEmail,
      urlReceiverEmail: receiverEmail,
      determinedRecipient: recipientEmail,
      userRole: {
        isServiceSeeker: user?.email === userEmail,
        isServiceProvider: user?.email === receiverEmail
      }
    }
  };
};
