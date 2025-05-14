import ProfileHeader from "@/components/common/profile-header";
import { RoomItem } from "@/components/messages/room-item";
import { chatRooms } from "@/constants/data";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Messages() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ProfileHeader title='Messages' showNotification=
        {false} />
      <FlatList
        data={chatRooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RoomItem
            room={item}
            onPress={() => router.push(`/message-room/${item.id}`)}
          />
        )}
        contentContainerStyle={{ paddingTop: 8 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-20">
            <Text>No chat rooms yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
} 