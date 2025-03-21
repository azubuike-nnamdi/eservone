import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, ScrollView, View, Image, Alert } from 'react-native'
import icons from '@/constants/icons'
import ProfileHeader from '@/components/common/profile-header'
import GeneralSetting from '@/components/profile/general-setting'
import { router } from 'expo-router'
import { MANAGE_SERVICES, BUSINESS_PROFILE, EARNINGS, CERTIFICATES, SIGN_IN } from '@/constants/routes'
import { generalSettings, supportSettings, legalSettings } from '@/constants/data'

export default function Profile() {
  const handleSignOut = async () => {
    setTimeout(() => {
      router.push(SIGN_IN)
      Alert.alert('Success', 'Logged out successfully');
    }, 2000)
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <ProfileHeader title='My profile' showNotification={false} />

        {/* User Profile Section */}
        <View className='flex-row items-center mt-6 mb-8'>
          <Image
            source={icons.person}
            className='size-16 rounded-full bg-gray-100'
          />
          <View className='ml-4'>
            <Text className='text-lg font-rubikMedium'>John Doe</Text>
            <Text className='text-gray-400'>sampleemail@gmail.com</Text>
          </View>
        </View>

        {/* Business Profile Section */}
        <View className='mb-4'>
          <GeneralSetting
            title='Business profile - [ XYZ Studios ]'
            showArrow={false}
            href={BUSINESS_PROFILE}
          />
        </View>

        {/* Services Section */}
        <View className='mb-4'>
          <GeneralSetting
            title='Manage services'
            showArrow={false}
            href={MANAGE_SERVICES}
          />
          <GeneralSetting
            title='Earnings'
            showArrow={false}
            href={EARNINGS}
          />
          <GeneralSetting
            title='Industrial certificates'
            showArrow={false}
            href={CERTIFICATES}
          />
        </View>

        {/* General Section */}
        <View className='mb-4'>
          <Text className='font-rubikSemiBold mb-4 text-xl'>General</Text>
          {generalSettings.map((setting) => (
            <GeneralSetting
              key={setting.id}
              title={setting.title}
              showArrow={false}
              href={setting.href}
            />
          ))}
        </View>

        {/* Support Section */}
        <View className='mb-4'>
          {supportSettings.map((setting) => (
            <GeneralSetting
              key={setting.id}
              title={setting.title}
              showArrow={false}
              href={setting.href}
            />
          ))}
        </View>

        {/* Legal Section */}
        <View className='mb-4'>
          {legalSettings.map((setting) => (
            <GeneralSetting
              key={setting.id}
              title={setting.title}
              showArrow={false}
              href={setting.href}
            />
          ))}
        </View>

        {/* Logout Section */}
        <View>
          <GeneralSetting
            title='Logout'
            showArrow={false}
            icon={icons.logout}
            textStyle='text-red-500'
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
