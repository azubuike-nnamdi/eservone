import { Message } from '@/constants/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface MessageBubbleProps {
  message: Message;
  currentUserEmail: string;
}

export default function MessageBubble({ message, currentUserEmail }: MessageBubbleProps) {
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
}
