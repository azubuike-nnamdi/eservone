import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { Message } from '@/constants/types';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import MessageBubble from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  currentUserEmail: string;
  isPending: boolean;
}

export default function MessageList({ messages, currentUserEmail, isPending }: MessageListProps) {
  if (isPending) {
    return (
      <View className="p-4">
        <LoadingSkeleton count={6} />
      </View>
    );
  }

  return (
    <FlatList
      data={messages}
      keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 16, paddingBottom: 16, flexGrow: 1 }}
      renderItem={({ item }) => (
        <MessageBubble message={item} currentUserEmail={currentUserEmail} />
      )}
      ListEmptyComponent={
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-400">No messages yet</Text>
        </View>
      }
    />
  );
}
