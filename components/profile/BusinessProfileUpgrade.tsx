import Button from '@/components/common/button';
import { CREATE_BUSINESS } from '@/constants/routes';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

interface BusinessProfileUpgradeProps {
  userRole: string | undefined;
  isBusinessProfile: boolean;
}

export default function BusinessProfileUpgrade({
  userRole,
  isBusinessProfile
}: BusinessProfileUpgradeProps) {
  if (userRole !== 'SERVICE_PROVIDER' || isBusinessProfile) {
    return null;
  }

  return (
    <View className='mb-6 p-4 bg-primary-300/10 rounded-lg border border-primary-200'>
      <View className='flex-row items-center justify-between'>
        <View className='flex-1'>
          <Text className='text-lg font-rubikMedium text-primary-300 mb-1'>
            Upgrade to Business Profile
          </Text>
          <Text className='text-sm text-primary-300 mb-3'>
            Unlock premium features and grow your business
          </Text>
        </View>
      </View>
      <Button
        className='bg-primary-300 rounded-lg py-3 px-4'
        onPress={() => router.push(CREATE_BUSINESS)}
      >
        <Text className='text-white text-center font-rubikMedium'>
          Upgrade Now
        </Text>
      </Button>
    </View>
  );
}
