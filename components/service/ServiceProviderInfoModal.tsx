import { ServiceProviderInfoModalProps } from '@/constants/types';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const ServiceProviderInfoModal = ({
  visible,
  onClose,
  // providerName,
  service,
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
        <View className="bg-white rounded-2xl w-11/12 p-6">
          <TouchableOpacity className="absolute right-4 top-4 z-10" onPress={onClose}>
            <MaterialIcons name="close" size={22} color="#222" />
          </TouchableOpacity>
          <Text className="text-zinc-800 text-base mb-4">
            {/* <Text className="font-bold">{providerName}</Text> has provided this service ({service}) <Text className="font-bold">{timesProvided} times</Text>. They have uploaded <Text className="font-bold">{certificates} industrial certifications</Text> for their service and their address has been verified. */}
          </Text>
          <View className="space-y-2 mb-6">
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
          </View>
          <View className="flex-row space-x-3 mt-2 gap-4">
            <TouchableOpacity className="flex-1 bg-primary-300 py-3 rounded-lg" onPress={onBook}>
              <Text className="text-white text-center font-bold">Book service</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-violet-100 py-3 rounded-lg" onPress={onViewProfile}>
              <Text className="text-primary-300 text-center font-bold">View full profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ServiceProviderInfoModal; 