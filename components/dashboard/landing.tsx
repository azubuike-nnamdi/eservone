import Button from '@/components/common/button';
import { getGreeting } from '@/lib/helper';
import { useAuthStore } from '@/store/auth-store';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
interface StatItem {
  id: string;
  label: string;
  value: string;
}

const DashboardScreen = ({ appointments }: { appointments: any }) => {
  const { user } = useAuthStore()

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
    { id: '2', label: 'Total earnings', value: '₦0.00' },
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
          ListFooterComponent={
            <View className='my-12 flex-col items-center justify-between'>
              <Text className='text-xl text-black-300 font-bold'>Average customer rating:</Text>
              <Text className='text-5xl  font-bold my-4 text-primary-300'>4.5</Text>

              <View className='flex-row items-center justify-between gap-3'>
                <Entypo name="star" size={20} color='#3E3F93' className='bg-primary-300 text-primary-300' />
                <Entypo name="star" size={20} color='#3E3F93' className='bg-primary-300 text-primary-300' />
                <Entypo nam size={20} color='#3E3F93' className='bg-primary-300 text-primary-300' />
                <Entypo name="star" size={20} color='#3E3F93' className='bg-primary-300 text-primary-300' />
                <Entypo name="star" size={20} color='#3E3F93' className='bg-primary-300 text-primary-300' />
              </View>

              <Text className='text-lg text-black-300 font-medium mt-4'>60 reviews</Text>

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
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;