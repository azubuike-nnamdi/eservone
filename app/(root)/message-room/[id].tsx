import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ProfileHeader from "@/components/common/profile-header";
import { Message } from "@/constants/types";
import useSendMessage from "@/hooks/mutation/useSendMessage";
import useGetRoomMessages from "@/hooks/query/useGetRoomMessages";
import { useAuthStore } from "@/store/auth-store";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MessageBubble = ({ message, currentUserEmail }: { message: Message, currentUserEmail: string }) => {
  const isUser = message.senderId === currentUserEmail;

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <View
      className={`my-1 px-3 py-2 rounded-2xl max-w-[80%] shadow-sm ${isUser ? 'bg-blue-500 self-end mr-2 ml-10' : 'bg-gray-200 self-start ml-2 mr-10'}`}
    >
      <Text className={`text-sm ${isUser ? 'text-white' : 'text-black'}`}>
        {message.body}
      </Text>

      {/* WhatsApp-style delivery status for user messages */}
      {isUser && (
        <View className="flex-row items-center justify-end mt-1">
          <Text className="text-xs text-blue-100 mr-1">
            {formatTime(message.time)}
          </Text>
          {message.isDelivered ? (
            <Ionicons name="checkmark-done" size={14} color="#FFFFFF" />
          ) : message.isSent ? (
            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
          ) : (
            <Ionicons name="time-outline" size={14} color="#FFFFFF" />
          )}
        </View>
      )}

      {!isUser && (
        <View className="flex-row items-center justify-end mt-1">
          <Text className="text-xs text-gray-500">
            {formatTime(message.time)}
          </Text>
        </View>
      )}

      {message.isOrder && (
        <View className="flex-row mt-2 space-x-2">
          <TouchableOpacity className="flex-1 border border-blue-600 rounded-md">
            <Text className="text-blue-600 text-center py-1">Make payment</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 border border-red-600 rounded-md">
            <Text className="text-red-600 text-center py-1">Decline offer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default function MessageRoom() {
  const { id, userEmail, receiverEmail } = useLocalSearchParams();

  const [input, setInput] = useState("");
  const user = useAuthStore((state) => state.user);
  const { handleSendMessage, isPending: isSendingMessage, messages: optimisticMessages } = useSendMessage();

  // Directly use the id from params instead of going through store
  const groupId = id as string;


  const { data, isPending, error } = useGetRoomMessages(groupId, receiverEmail as string, userEmail as string);


  // Combine server messages with optimistic messages and sort by timestamp
  const allMessages = [...(data || []), ...optimisticMessages];

  let displayedMessages = allMessages;
  try {
    displayedMessages = allMessages.sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return timeA - timeB;
    });
  } catch (error) {
    console.error("Error sorting messages:", error);
    // If sorting fails, just use the original order
    displayedMessages = allMessages;
  }

  const handleSendMessagePress = async () => {
    if (!input.trim() || !id || !user || !userEmail) return;

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
      groupId: id as string,
      recipientId: userEmail as string,
      sender: user.email
    };

    console.log("Sending message with payload:", payload);

    handleSendMessage(payload, optimisticMessage);
  };

  // Show error state if there's an error
  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ProfileHeader title="Messages" showNotification={false} backDestination="/(root)/(tabs)/messages" />
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-red-500 text-center text-lg font-semibold mb-2">
            Error Loading Messages
          </Text>
          <Text className="text-zinc-500 text-center">
            {error.message || "Something went wrong. Please try again later."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ProfileHeader title="Messages" showNotification={false} backDestination="/(root)/(tabs)/messages" />
        <View className="flex-1">
          {isPending ? (
            <View className="p-4">
              <LoadingSkeleton count={6} />
            </View>
          ) : (
            <FlatList
              data={displayedMessages}
              keyExtractor={item => item.id}
              contentContainerStyle={{ padding: 16, paddingBottom: 16, flexGrow: 1 }}
              renderItem={({ item, index }) => {
                return (
                  <MessageBubble message={item} currentUserEmail={user?.email || ''} />
                );
              }}
              ListEmptyComponent={
                <View className="flex-1 justify-center items-center">
                  <Text className="text-gray-400">No messages yet</Text>
                </View>
              }
            />
          )}
        </View>
        {/* Input field fixed at the bottom */}
        <View className="flex-row items-center px-3 py-2 border-gray-200 border bg-white mx-4 rounded-full">
          <TextInput
            className="flex-1 text-base text-zinc-800 px-2 py-2 bg-transparent z-50"
            placeholder="Type a message..."
            placeholderTextColor="#A1A1AA"
            value={input}
            onChangeText={setInput}
            multiline
            editable={!isSendingMessage}
          />
          <TouchableOpacity onPress={handleSendMessagePress} disabled={isSendingMessage}>
            <Ionicons name="send" size={24} color={isSendingMessage ? "#ccc" : "black"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 