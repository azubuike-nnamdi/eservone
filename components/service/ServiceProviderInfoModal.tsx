import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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
  emailAddress?: string;
  providerBusinessStatus?: boolean;
  providerVerificationStatus?: boolean;
  onBook: () => void;
  onViewProfile: (emailAddress?: string) => void;
}

const ServiceProviderInfoModal = ({
  visible,
  onClose,
  service,
  serviceDescription,
  uploadImage = [],
  address,
  serviceDeliveryType,
  emailAddress,
  onBook,
  providerBusinessStatus,
  providerVerificationStatus,
  onViewProfile,
}: ServiceProviderInfoModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white rounded-t-3xl w-full max-h-[85%] p-6">
          {/* Grab Handle */}
          <View className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

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

          {/* Service Provider Summary */}
          <View className="mb-6">
            <Text className="text-zinc-700 mb-2 text-md">
              {`${emailAddress} is the provider of this service`}
            </Text>
            {/* <Text className="text-zinc-700 mb-4">
              They have uploaded **{certificates} industrial certifications** for their service and their address has been verified.
            </Text> */}
          </View>

          {/* Verification Status */}
          <View className="space-y-3 mb-6">
            {providerVerificationStatus && (
              <View className="flex-row items-center space-x-2">
                <MaterialIcons name="verified-user" size={18} color="#3E3F93" />
                <Text className="text-zinc-700 ml-2">{'Identity Verified'}</Text>
              </View>
            )}
            {providerBusinessStatus && (
              <View className="flex-row items-center space-x-2 my-3">
                <MaterialCommunityIcons name="certificate" size={18} color="#22C55E" />
                <Text className="text-zinc-700 ml-2">{'Industrial certificates'}</Text>
              </View>
            )}
            {providerBusinessStatus && providerVerificationStatus && (
              <View className="flex-row items-center space-x-2">
                <MaterialCommunityIcons name="fire" size={18} color="#EF4444" />
                <Text className="text-zinc-700 ml-2 ">Top service provider</Text>
              </View>
            )}
          </View>

          <View className="flex-row space-x-3 mt-2 gap-4 mb-8">
            <TouchableOpacity className="flex-1 bg-primary-300 py-3 rounded-lg" onPress={onBook}>
              <Text className="text-white text-center font-bold">Book service</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-violet-100 py-3 rounded-lg" onPress={() => onViewProfile(emailAddress)}>
              <Text className="text-primary-300 text-center font-bold">View full profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ServiceProviderInfoModal; 