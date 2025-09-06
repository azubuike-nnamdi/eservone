import ProfileHeader from '@/components/common/profile-header';
import React from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';

const LoadingState: React.FC = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <ProfileHeader title='Reviews' showNotification={false} showCurrency={true} showBackArrow={true} />
      <View className="flex-1 items-center justify-center">
        <View className="items-center">
          <ActivityIndicator size="large" color="#3E3F93" />
          <Text className="text-gray-600 font-medium mt-4">Loading reviews...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoadingState;
