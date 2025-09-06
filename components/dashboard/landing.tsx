import RatingSection from '@/components/dashboard/RatingSection';
import StatItem from '@/components/dashboard/StatItem';
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails';
import useAppointmentStats from '@/hooks/useAppointmentStats';
import { formatNumberWithCommas, getGreeting } from '@/lib/helper';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, Text, View } from 'react-native';


interface StatItemData {
  id: string;
  label: string;
  value: string;
}

type DashboardScreenProps = {
  appointmentCount: any;
  reviewCount: number;
  balance: number;
  currency: string;
  ratingCount: number;
}

const DashboardScreen = ({ appointmentCount, reviewCount, balance, currency, ratingCount }: DashboardScreenProps) => {
  const { user } = useAuthStore();
  const { refetch: refetchUserProfile } = useGetUserProfileDetails();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Use custom hook for appointment stats
  const appointmentStats = useAppointmentStats(appointmentCount);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchUserProfile(),
      ]);
    } finally {
      setRefreshing(false);
    }
  }, [refetchUserProfile]);

  // Prepare stats data for rendering
  const statsData: StatItemData[] = useMemo(() => [
    { id: '1', label: 'New job requests', value: appointmentStats.pending.toString() },
    { id: '2', label: 'Total Amount', value: `${currency} ${formatNumberWithCommas(balance ?? 0)}` },
    { id: '3', label: 'Completed appointments', value: appointmentStats.completed.toString() },
    { id: '4', label: 'Cancelled appointments', value: appointmentStats.canceled.toString() }
  ], [appointmentStats, currency, balance]);

  const handleViewReviews = useCallback(() => {
    router.push('/view-reviews');
  }, [router]);

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
          renderItem={({ item }) => <StatItem label={item.label} value={item.value} />}
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
            <RatingSection
              ratingCount={ratingCount}
              reviewCount={reviewCount}
              onViewReviews={handleViewReviews}
            />
          }
        />

        {/* Loading Overlay during refresh */}
        {refreshing && (
          <View className="absolute inset-0  justify-center items-center z-50">
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