import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

interface ServiceProviderInfoModalProps {
  visible: boolean;
  onClose: () => void;
  service: string;
  serviceDescription?: string;
  uploadImage?: { image: string; imageTitle: string; serviceName: string }[];
  address?: string;
  serviceDeliveryType?: string;
  timesProvided: number;
  certificates: number;
  isVerified: boolean;
  isTopProvider: boolean;
  onBook: () => void;
  onViewProfile: () => void;
}

const ServiceProviderInfoModal = ({
  visible,
  onClose,
  service,
  serviceDescription,
  uploadImage = [],
  address,
  serviceDeliveryType,
  timesProvided,
  certificates,
  isVerified,
  isTopProvider,
  onBook,
  onViewProfile,
}: ServiceProviderInfoModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="bg-white rounded-2xl w-11/12 max-h-[90%] p-6">
          <TouchableOpacity className="absolute right-4 top-4 z-10" onPress={onClose}>
            <MaterialIcons name="close" size={22} color="#222" />
          </TouchableOpacity>

          {/* Service Images */}
          {uploadImage && uploadImage.length > 0 && (
            <View className="mb-4">
              <Text className="text-lg font-bold text-zinc-800 mb-2">Service Images</Text>
              <View className="flex-row flex-wrap gap-2">
                {uploadImage.map((img, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: img.image }}
                    className="w-20 h-20 rounded-lg"
                    resizeMode="cover"
                  />
                ))}
              </View>
            </View>
          )}

          {/* Service Information */}
          <View className="mb-4">
            <Text className="text-xl font-bold text-zinc-800 mb-2">{service}</Text>
            {serviceDescription && (
              <Text className="text-zinc-600 mb-2">{serviceDescription}</Text>
            )}
            {address && (
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text className="text-zinc-600 ml-1">{address}</Text>
              </View>
            )}
            {serviceDeliveryType && (
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="delivery-dining" size={16} color="#666" />
                <Text className="text-zinc-600 ml-1">{serviceDeliveryType}</Text>
              </View>
            )}
          </View>

          {/* <View className="space-y-2 mb-6">
            <View className="flex-row items-center space-x-2">
              <MaterialIcons name="verified-user" size={18} color="#3E3F93" />
              <Text className="text-zinc-700">Identity Verified</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <MaterialCommunityIcons name="certificate" size={18} color="#22C55E" />
              <Text className="text-zinc-700">Industrial certificates [ {certificates} ]</Text>
            </View>
            {isTopProvider && (
              <View className="flex-row items-center space-x-2">
                <MaterialCommunityIcons name="fire" size={18} color="#EF4444" />
                <Text className="text-zinc-700">Top service provider</Text>
              </View>
            )}
          </View> */}

          <View className="flex-row space-x-3 mt-2 gap-4">
            <TouchableOpacity className="flex-1 bg-primary-300 py-3 rounded-lg" onPress={onBook}>
              <Text className="text-white text-center font-bold">Book service</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity className="flex-1 bg-violet-100 py-3 rounded-lg" onPress={onViewProfile}>
              <Text className="text-primary-300 text-center font-bold">View full profile</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ServiceProviderInfoModal; 