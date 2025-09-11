import { ProviderService } from '@/constants/types';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import ProviderServiceItem from './ProviderServiceItem';

interface ProviderServicesListProps {
  services: ProviderService[];
  onBookService: (id: string) => void;
}

export default function ProviderServicesList({ services, onBookService }: ProviderServicesListProps) {
  if (!services || services.length === 0) {
    return (
      <View className="items-center py-8">
        <Text className="text-gray-500 text-center">No services available</Text>
      </View>
    );
  }

  const renderServiceItem = ({ item, index }: { item: ProviderService; index: number }) => (
    <ProviderServiceItem
      service={item}
      index={index}
      onBookService={onBookService}
    />
  );

  return (
    <FlatList
      data={services}
      renderItem={renderServiceItem}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}
