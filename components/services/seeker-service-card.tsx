import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ServiceProviderInfoModal from "../service/ServiceProviderInfoModal";

interface SeekerServiceCardProps {
  title: string;
  studio: string;
  priceRange: string;
  currency?: string;
  rating?: number;
  isVerified?: boolean;
  lastActive?: string;
  distance?: string;
  serviceDeliveryType: string;
  onPress?: () => void;
}

const SeekerServiceCard: React.FC<SeekerServiceCardProps> = ({
  title,
  studio,
  priceRange,
  currency,
  // rating = 4.5,
  isVerified = false,
  serviceDeliveryType,
  // lastActive = "Active 4 days ago",
  // distance = "",
  onPress,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        className="bg-white rounded-xl border border-gray-200 p-4 mb-3 mx-1 shadow-xs"
      >

        <View className="flex-row justify-between items-center">
          <View className="">
            <Text className="font-bold text-base text-gray-900 mb-1 bl">{title}</Text>
            <View className="flex-row items-center mb-1">

              <Text className="text-sm text-gray-500">{studio}</Text>
              {isVerified && (
                <MaterialCommunityIcons name="check-decagram" size={14} color="#4338CA" style={{ marginLeft: 4 }} />
              )}
              <Text className="text-sm text-gray-500 ml-2">{priceRange}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Text className="text-xs text-gray-400">Service delivery type: </Text>
              <Text className="text-xs text-gray-400">{serviceDeliveryType}</Text>


            </View>
          </View>

          <View className="flex-row justify-between items-center mb-1">

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialIcons name="more-vert" size={18} color="#888" />
            </TouchableOpacity>
          </View>
        </View>


      </TouchableOpacity>
      <ServiceProviderInfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        providerName={studio}
        service={title}
        timesProvided={419}
        certificates={5}
        isVerified={isVerified}
        isTopProvider={true}
        onBook={() => { }}
        onViewProfile={() => { }}
      />
    </>
  );
};

export default SeekerServiceCard;
