import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import EmptyState from '@/components/services/empty-state';
import ServiceCard from '@/components/services/service-card';
import { ServiceItem } from '@/constants/types';
import useGetServicesByUserId from '@/hooks/query/useGetServicesByUserId';
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails';
import { Ionicons } from '@expo/vector-icons';
import { AxiosError } from "axios";
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ManageServicesDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data: userProfileDetails } = useGetUserProfileDetails();

  const isCompleteSignUp = userProfileDetails?.data?.completeSignUp

  const { data: servicesByUserId, isPending: isServicesByUserIdPending, isError, error } = useGetServicesByUserId();

  const errData = (error as AxiosError)?.response?.data as any;

  const userServices = servicesByUserId?.data ?? []

  const handleAddNewService = () => {
    router.push('/service-creation/create-service');
  };

  const renderItem = ({ item }: { item: ServiceItem }) => (
    <ServiceCard
      item={item}
      onPress={() => router.push(`/profile/edit-service/${item.id}`)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 relative">
        {isCompleteSignUp ? (
          <>
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
          </>
        ) : (
          <View
            className="absolute w-full items-center"
            style={{
              position: 'absolute',
              bottom: insets.bottom + (Platform.OS === 'ios' ? 32 : 24),
              left: 0,
              right: 0,
              zIndex: 50,
              top: 0,
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.95)',
            }}
          >
            <View className="bg-white rounded-lg p-4 items-center w-11/12">
              <View className="mb-2">
                <Ionicons name="alert-circle-outline" size={32} color="#F59E42" />
              </View>
              <View className="mb-3">
                <Text className="text-center text-base font-semibold text-gray-800">
                  Kindly complete signup before you create a service
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push('/service-creation/verify-identity')}
                className="bg-primary-300 rounded-md px-6 py-2"
              >
                <Text className="text-white font-semibold">Complete Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}