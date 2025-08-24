import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import RatingStars from "../common/RatingStars";
import ServiceProviderInfoModal from "../service/ServiceProviderInfoModal";

interface SeekerServiceCardProps {
  title: string;
  priceRange: string;
  currency?: string;
  ratingCount?: number;
  reviewCount?: number;
  isVerified?: boolean;
  serviceDeliveryType: string;
  uploadImage?: { image: string; imageTitle: string; serviceName: string }[];
  serviceDescription?: string;
  address?: string;
  onPress?: () => void;
}

const SeekerServiceCard: React.FC<SeekerServiceCardProps> = ({
  title,
  priceRange,
  currency,
  ratingCount,
  reviewCount,
  isVerified = false,
  serviceDeliveryType,
  uploadImage = [],
  serviceDescription,
  address,
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
        {/* Service Images */}
        {uploadImage && uploadImage.length > 0 && (
          <View className="mb-3">
            <View className="flex-row flex-wrap gap-2">
              {uploadImage.slice(0, 3).map((img, idx) => (
                <Image
                  key={idx}
                  source={{ uri: img.image }}
                  className="w-16 h-16 rounded-lg"
                  resizeMode="cover"
                />
              ))}
              {uploadImage.length > 3 && (
                <View className="w-16 h-16 rounded-lg bg-gray-200 items-center justify-center">
                  <Text className="text-xs text-gray-500">+{uploadImage.length - 3}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="font-bold text-base text-gray-900 mb-1">{title}</Text>
            <View className="flex-row items-center mb-1">
              {isVerified && (
                <MaterialCommunityIcons name="check-decagram" size={14} color="#4338CA" style={{ marginLeft: 4 }} />
              )}
              <Text className="text-sm text-gray-500 ml-2">{priceRange}</Text>
            </View>
            <View className="flex-row items-center mb-1">
              <RatingStars ratingCount={ratingCount || 0} size={14} />
              <Text className="text-xs text-gray-400 ml-2">({reviewCount || 0} reviews)</Text>
            </View>
            <View className="flex-row items-center mb-1">
              <Text className="text-xs text-gray-400">Service delivery type: </Text>
              <Text className="text-xs text-gray-400">{serviceDeliveryType}</Text>
            </View>
            {address && (
              <View className="flex-row items-center mb-1">
                <Text className="text-xs text-gray-400">Address: </Text>
                <Text className="text-xs text-gray-400">{address}</Text>
              </View>
            )}
          </View>

          <View className="ml-2">
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialIcons name="more-vert" size={18} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <ServiceProviderInfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        service={title}
        serviceDescription={serviceDescription}
        uploadImage={uploadImage}
        address={address}
        serviceDeliveryType={serviceDeliveryType}
        timesProvided={419}
        certificates={5}
        isVerified={isVerified}
        isTopProvider={true}
        onBook={() => {
          setModalVisible(false);
          onPress && onPress();
        }}
        onViewProfile={() => { }}
      />
    </>
  );
};

export default SeekerServiceCard;
