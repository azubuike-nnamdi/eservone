import ProfileHeader from '@/components/common/profile-header'
import { useAuthStore } from '@/store/auth-store'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileInformation() {
  const { user } = useAuthStore();


  const { firstName, lastName, email } = user || {};
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=''>
        <ProfileHeader title='Profile information' showNotification={false} />

        <View className='px-7'>
          {/* Profile Picture and Basic Info */}
          <View className='items-left mt-6'>
            <View className='w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-4'>
              <Feather name="user" size={40} color="#6B7280" />
            </View>
            <Text className='text-2xl font-semibold'>{firstName} {lastName}</Text>
            <View className='flex-row items-center mt-2'>
              <Text className='text-gray-600'>{email}</Text>
              <Text className='text-gray-400 mx-2'>•</Text>
              <Text className='text-gray-600'>Joined 24th August, 2032</Text>
            </View>
          </View>

          {/* Bio Section */}
          <View className='mt-8'>
            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-xl font-semibold'>Bio</Text>
              <Feather name="edit-2" size={15} color="#6B7280" />
            </View>
            <Text className='text-gray-600 leading-6'>
              As a passionate hairstylist with a keen eye for trends and techniques, I thrive on transforming looks and boosting confidence. With a love for helping clients express their individuality, I offer personalized styles that cater to each person's unique hair type and preferences. I believe in the magic of collaboration and am always excited to work with fellow creatives and clients to bring their hair dreams to life. Let's team up and make your hair vision a reality!
            </Text>
          </View>

          {/* Home Address Section */}
          <View className='mt-8'>
            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-xl font-semibold'>Home address</Text>
              <Feather name="edit-2" size={15} color="#6B7280" />
            </View>
            <Text className='text-gray-600'>456 Maple Avenue, Toronto, ON, M5A 1A1, Canada</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}
