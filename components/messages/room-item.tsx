import { chatRooms } from "@/constants/data";
import { formatTimeFromISO } from "@/lib/helper";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const RoomItem = ({ room, onPress }: { room: typeof chatRooms[0]; onPress: () => void }) => (
  <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-zinc-100" onPress={onPress}>
    {room.avatar ? (
      <Image source={{ uri: room.avatar }} className="w-12 h-12 rounded-full mr-3" />
    ) : (
      <View className="w-12 h-12 rounded-full bg-zinc-200 mr-3 items-center justify-center">
        <Text className="text-2xl text-zinc-400">👤</Text>
      </View>
    )}
    <View className="flex-1">
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-base text-zinc-800">{room.name}</Text>
        <Text className="text-xs text-zinc-400">{formatTimeFromISO(room.date)}</Text>
      </View>
      <Text className="text-zinc-500 text-sm mt-0.5" numberOfLines={1}>{room.lastMessage}</Text>
    </View>
  </TouchableOpacity>
);