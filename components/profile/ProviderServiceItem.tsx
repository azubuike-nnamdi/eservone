import { ProviderService } from '@/constants/types';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ProviderServiceItemProps {
  service: ProviderService;
  index: number;
  onBookService: (id: string) => void;
}

export default function ProviderServiceItem({
  service,
  index,
  onBookService
}: ProviderServiceItemProps) {
  return (
    <View className="flex-row items-start mb-4 bg-white rounded-lg p-3 border border-gray-100">
      <Image
        source={{
          uri: service.uploadImage && service.uploadImage.length > 0
            ? service.uploadImage[0].image
            : 'https://picsum.photos/80/80?random=' + index
        }}
        className="w-20 h-20 rounded-lg mr-3"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="font-bold text-black text-base mb-1">{service.serviceName}</Text>
        <Text className="text-gray-600 text-sm leading-5 mb-2">
          {service.serviceDescription?.split(' ').slice(0, 5).join(' ') + (service.serviceDescription?.split(' ').length > 10 ? '...' : '')}
        </Text>
        <View className="flex-row items-center mb-2">
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text className="text-gray-600 text-sm ml-1">{service.address}</Text>
        </View>
        <TouchableOpacity onPress={() => onBookService(service.id.toString())}>
          <Text className="text-primary-300 font-medium">Book service {'>'}</Text>
        </TouchableOpacity>
      </View>
      <View className="items-end">
        <Text className="text-black font-medium">
          ₦{service.minimumPrice?.toLocaleString()} - ₦{service.maximumPrice?.toLocaleString()}
        </Text>
        <Text className="text-gray-500 text-xs mt-1">{service.currency}</Text>
      </View>
    </View>
  );
}
