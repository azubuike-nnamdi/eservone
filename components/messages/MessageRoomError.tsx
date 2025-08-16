import ProfileHeader from '@/components/common/profile-header';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MessageRoomErrorProps {
  error: Error;
}

export default function MessageRoomError({ error }: MessageRoomErrorProps) {
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
