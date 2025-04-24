import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function ServicePublishedScreen() {

  const handleBackHome = () => {
    // Navigate back to the main tab layout (adjust route if needed)
    router.replace('/(root)/(tabs)')
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 justify-center items-center px-7'>
        {/* Icon */}
        <View className='size-32 bg-green-100 rounded-full justify-center items-center mb-8'>
          <Ionicons name="checkmark-circle-outline" size={60} color="#16A34A" />
        </View>

        {/* Title */}
        <Text className='text-xl font-rubikMedium text-center text-gray-900 mb-3'>
          Service published!
        </Text>

        {/* Subtitle */}
        <Text className='text-sm text-gray-500 text-center mb-12'>
          Your service has been published, and clients can now find it when searching for services that match yours.
        </Text>

        {/* Back to Home Icon */}
        <Ionicons name="home-outline" size={32} color="#4338CA" className='mb-3' />

        {/* Back to Home Text */}
        <TouchableOpacity onPress={handleBackHome}>
          <Text className='text-base font-rubikMedium text-primary-600'>
            Back to home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
} 