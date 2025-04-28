import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const EmptyState = ({ onAddPress, errorMessage }: { onAddPress: () => void; errorMessage?: string }) => (
  <View className="flex-1 justify-center items-center px-10">
    <Ionicons name="briefcase-outline" size={60} color="#D1D5DB" />
    <Text className="text-xl font-rubikMedium text-gray-600 mt-4 text-center">No Services Yet</Text>
    {errorMessage && (
      <Text className="text-base text-red-500 font-rubikRegular mt-2 text-center mb-2">
        {errorMessage}
      </Text>
    )}
    <Text className="text-base text-gray-400 font-rubikRegular mt-2 text-center mb-6">
      Add your first service to start offering it to customers.
    </Text>
    <TouchableOpacity
      onPress={onAddPress}
      className="bg-primary-500 py-3 px-6 rounded-lg flex-row items-center"
    >
      <Ionicons name="add-circle-outline" size={20} color="white" />
      <Text className="text-white font-rubikMedium text-base ml-2">Add New Service</Text>
    </TouchableOpacity>
  </View>
);

export default EmptyState;