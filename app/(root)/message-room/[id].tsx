import ProfileHeader from "@/components/common/profile-header";
import MessageInput from "@/components/messages/MessageInput";
import MessageList from "@/components/messages/MessageList";
import MessageRoomError from "@/components/messages/MessageRoomError";
import { useMessageRoomLogic } from "@/hooks/useMessageRoomLogic";
import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MessageRoom() {
  const {
    displayedMessages,
    isPending,
    error,
    input,
    setInput,
    handleSendMessagePress,
    isSendingMessage,
    user,
    // debugInfo
  } = useMessageRoomLogic();

  // // Debug logging
  // console.log("Message Room Debug:", debugInfo);

  // Show error state if there's an error
  if (error) {
    return <MessageRoomError error={error} />;
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
          <MessageList
            messages={displayedMessages}
            currentUserEmail={user?.email || ''}
            isPending={isPending}
          />
        </View>

        <MessageInput
          input={input}
          setInput={setInput}
          onSend={handleSendMessagePress}
          isSending={isSendingMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 