import ProfileHeader from '@/components/common/profile-header';
import icons from '@/constants/icons';
import { Ionicons } from '@expo/vector-icons'; // Using MaterialCommunityIcons for briefcase
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function IdentificationConfirmation() {

  const handleProceed = () => {
    // Navigate to the create-service screen within the current stack
    router.push('/service-creation/create-service')
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>

      <ProfileHeader title="Confirmation" showBackArrow={true} showNotification={false} />

      {/* Main content centered */}
      <View className='flex-1 justify-center items-center px-7'>
        {/* Top Icon */}
        <View className='size-32 bg-primary-100 rounded-full justify-center items-center mb-8'>
          <Ionicons name="shield-checkmark-outline" size={20} color="#4338CA" />
        </View>

        {/* Title */}
        <Text className='text-xl font-rubikMedium text-center text-gray-900 mb-3'>
          You&apos;re one step away from verifying your identity!
        </Text>

        {/* Subtitle */}
        <Text className='text-sm text-gray-500 text-center mb-12'>
          Our team will review your submission. Once you&apos;re verified, the "Blue Badge" will appear next to your name.
        </Text>


        <Image source={icons.workIcon} className='w-8 h-8' />

        {/* Proceed Link/Button Text */}
        <TouchableOpacity onPress={handleProceed}>
          <Text className='text-base font-rubikMedium text-primary-300 pt-5'>
            Proceed to "Create a service"
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}