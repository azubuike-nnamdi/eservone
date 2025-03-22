import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

import { View } from "react-native";

export const ServiceTypeStep = ({ onNext }: { onNext: (type: 'SERVICE_PROVIDER' | 'SERVICE_SEEKER') => void }) => (
  <View>
    <TouchableOpacity
      className="p-4 border border-gray-200 rounded-md mb-4"
      onPress={() => onNext('SERVICE_PROVIDER')}
    >
      <View className="flex-row items-center">
        <Ionicons name="briefcase-outline" size={24} color="#3E3F93" />
        <Text className="ml-3 text-black">I'm a service provider</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      className="p-4 border border-gray-200 rounded-md"
      onPress={() => onNext('SERVICE_SEEKER')}
    >
      <View className="flex-row items-center">
        <Ionicons name="search-outline" size={24} color="#3E3F93" />
        <Text className="ml-3 text-black">I'm seeking a service</Text>
      </View>
    </TouchableOpacity>
  </View>
);