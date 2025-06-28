import ProfileHeader from "@/components/common/profile-header";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Messages() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);




  return (
    <SafeAreaView className="flex-1 bg-white">
      <ProfileHeader title="Messages" showNotification={false} />
      {/* <FlatList
        data={conversations}
        keyExtractor={item => item.$id}
        renderItem={({ item }) => (
          <RoomItem
            room={{
              id: item.$id,
              name: item.name,
              avatar: item.avatar ?? "",
              lastMessage: item.lastMessage ?? "",
              date: item.updatedAt ?? "",
            }}
            onPress={() => router.push(`/message-room/${item.$id}`)}
          />
        )}
        contentContainerStyle={{ paddingTop: 8 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-20">
            <Text>{loading ? <LoadingSkeleton count={3} /> : "No chat rooms yet"}</Text>
          </View>
        }
      /> */}
    </SafeAreaView>
  );
} 