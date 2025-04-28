import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import EmptyState from '@/components/services/empty-state';
import ServiceCard from '@/components/services/service-card';
import { ServiceItem } from '@/constants/types';
import useGetServicesByUserId from '@/hooks/query/useGetServicesByUserId';
import { Ionicons } from '@expo/vector-icons';
import { AxiosError } from "axios";
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Platform, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ManageServicesDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data: servicesByUserId, isPending: isServicesByUserIdPending, isError, error } = useGetServicesByUserId();

  const errData = (error as AxiosError)?.response?.data as any;

  const userServices = servicesByUserId?.data ?? []

  const handleAddNewService = () => {
    router.push('/service-creation/create-service');
  };

  const renderItem = ({ item }: { item: ServiceItem }) => <ServiceCard item={item} />;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 relative">

        {isServicesByUserIdPending ? (
          <LoadingSkeleton count={3} />
        ) : isError ? (
          <EmptyState
            onAddPress={handleAddNewService}
            errorMessage={errData?.description || JSON.stringify(errData)}
          />
        ) : (
          <FlatList
            data={userServices}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerClassName="p-4 pt-6 pb-24"
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Floating Action Button */}
        <TouchableOpacity
          onPress={handleAddNewService}
          className="absolute rounded-full bg-primary-300 p-4 shadow-lg"
          style={{
            position: 'absolute',
            bottom: insets.bottom + (Platform.OS === 'ios' ? 32 : 24),
            right: insets.right + 24,
            elevation: 10,
            zIndex: 50,
          }}
        >
          <Ionicons name="add-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}