import { FALLBACK_IMAGE } from "@/constants/data";
import { ServiceItem } from "@/constants/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ServiceCard = ({ item }: { item: ServiceItem }) => {

  const handleManageService = () => {
    router.push(`/profile/edit-service/${item.id}`);
  };

  return (
    <View className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
      <Image
        source={{ uri: FALLBACK_IMAGE }}
        className="w-full h-48"
        resizeMode="cover"
      />
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-1">
          <View className="flex-row items-center flex-1 mr-2">
            <Text className="text-lg font-rubikMedium text-gray-800 mr-1" numberOfLines={1} ellipsizeMode="tail">
              {item.serviceName}
            </Text>
            {item.active && (
              <MaterialCommunityIcons name="check-decagram" size={18} color="#4CAF50" />
            )}
          </View>
          <Text className="text-base font-rubikRegular text-gray-600">
            ${item.minimumPrice} - ${item.maximumPrice}
          </Text>
        </View>
        <Text className="text-sm text-gray-500 font-rubikRegular mb-4" numberOfLines={2} ellipsizeMode="tail">
          {item.serviceDescription}
        </Text>
        <TouchableOpacity onPress={handleManageService} className="flex-row items-center self-start">
          <Ionicons name="pencil-outline" size={18} color="#4338CA" />
          <Text className="text-primary-600 ml-1 font-rubikMedium text-sm">Manage service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceCard;