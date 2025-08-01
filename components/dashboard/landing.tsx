import Button from '@/components/common/button';
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails';
import { formatNumberWithCommas, getGreeting } from '@/lib/helper';
import { useAuthStore } from '@/store/auth-store';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, Text, View } from 'react-native';
interface StatItem {
  id: string;
  label: string;
  value: string;
}

type DashboardScreenProps = {
  appointments: any;
  refetchAppointments?: () => void;
  reviewCount: number;
  balance: number;
  currency: string;
}

const DashboardScreen = ({ appointments, refetchAppointments, reviewCount, balance, currency }: DashboardScreenProps) => {
  const { user } = useAuthStore()
  const { refetch: refetchUserProfile } = useGetUserProfileDetails();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchAppointments?.(),
        refetchUserProfile(),
      ]);
    } finally {
      setRefreshing(false);
    }
  }, [refetchAppointments, refetchUserProfile]);

  // Calculate appointment statistics
  const appointmentStats = useMemo(() => {
    if (!appointments?.data) {
      return {
        completed: 0,
        canceled: 0,
        pending: 0,
        total: 0
      };
    }


    const completed = appointments.data.filter((appointment: any) => appointment.serviceStatus === 'COMPLETED').length;
    const canceled = appointments.data.filter((appointment: any) => appointment.serviceStatus === 'CANCELED').length;
    const pending = appointments.data.filter((appointment: any) => appointment.serviceStatus === 'PENDING').length;
    const total = appointments.data.length;

    return { completed, canceled, pending, total };
  }, [appointments?.data]);

  const statsData: StatItem[] = [
    { id: '1', label: 'New job requests', value: appointmentStats.pending.toString() },
    { id: '2', label: 'Total Amount', value: `${currency} ${formatNumberWithCommas(balance)}` },
    { id: '3', label: 'Completed appointments', value: appointmentStats.completed.toString() },
    { id: '4', label: 'Cancelled appointments', value: appointmentStats.canceled.toString() }
  ];

  const renderStatItem = ({ item }: { item: StatItem }) => (
    <View className="bg-gray-100 rounded-lg p-4 w-[48%] mb-2">
      <Text className="text-gray-600 text-xs mb-1">
        {item.label}
      </Text>
      <Text className="text-lg font-bold text-blue-800">
        {item.value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1  bg-white">
        <View className='flex-row items-center justify-between my-4'>
          <View className="flex-row items-baseline my-4">
            <Text className="text-2xl font-bold">{getGreeting()},</Text>
            <Text className="text-2xl text-black-300/50 font-medium ml-1">
              {user?.firstName}
            </Text>
          </View>
        </View>
        <FlatList
          data={statsData}
          renderItem={renderStatItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#7C6AED', '#3E3F93']}
              tintColor="#7C6AED"
              progressBackgroundColor="#ffffff"
              progressViewOffset={10}
            />
          }
          ListFooterComponent={
            <View className='my-12 flex-col items-center justify-between'>
              <Text className='text-xl text-black-300 font-bold'>Average customer rating:</Text>
              <Text className='text-5xl  font-bold my-4 text-primary-300'>{reviewCount ?? 0}</Text>

              <View className='flex-row items-center justify-between gap-3'>
                <Entypo name="star" size={20} color='#3E3F93' className='bg-primary-300 text-primary-300' />
                <Entypo name="star" size={20} color='#3E3F93' className='bg-primary-300 text-primary-300' />
                <Entypo nam size={20} color='#3E3F93' className='bg-primary-300 text-primary-300' />
                <Entypo name="star" size={20} color='#3E3F93' className='bg-primary-300 text-primary-300' />
                <Entypo name="star" size={20} color='#3E3F93' className='bg-primary-300 text-primary-300' />
              </View>

              <Text className='text-lg text-black-300 font-medium mt-4'>{reviewCount ?? 0} reviews</Text>

              <Button type='button' variant='outline' className='mt-4 w-6/12'>
                <Text className='font-bold text-primary-300 text-lg'>Read all reviews</Text>
              </Button>

            </View>
          }

        />


        <View className='my-8 flex-row items-center justify-between'>
          <Text className='text-lg text-black-300 font-bold'>Average customer rating:</Text>
          <Text className='text-lg text-black-300 font-bold'>4.5</Text>
        </View>

        {/* Loading Overlay during refresh */}
        {refreshing && (
          <View className="absolute inset-0 bg-black/20 justify-center items-center z-50">
            <View className="bg-white rounded-lg p-6 shadow-lg">
              <ActivityIndicator size="large" color="#7C6AED" />
              <Text className="text-gray-600 mt-3 font-medium">Refreshing...</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;