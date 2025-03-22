import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, ScrollView, View, Image, Alert, ActivityIndicator } from 'react-native'
import icons from '@/constants/icons'
import ProfileHeader from '@/components/common/profile-header'
import GeneralSetting from '@/components/profile/general-setting'
import { router } from 'expo-router'
import { MANAGE_SERVICES, BUSINESS_PROFILE, EARNINGS, CERTIFICATES, SIGN_IN } from '@/constants/routes'
import { generalSettings, supportSettings, legalSettings } from '@/constants/data'
import { useAuth } from '@/context/auth-context'
import { useUser } from '@/context/user-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Profile() {
  const { clearToken, isLoading: isAuthLoading } = useAuth()
  const { clearUser, isLoading: isUserLoading, user } = useUser();

  const handleSignOut = async () => {
    try {
      await clearToken()
      await clearUser()
      AsyncStorage.removeItem('token')
      AsyncStorage.removeItem('requestId')
      router.push(SIGN_IN)
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out')
    }
  }

  if (isAuthLoading || isUserLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 font-rubikMedium">Signing out...</Text>
      </View>
    )
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
            <Text className='text-lg font-rubikMedium'>{user?.firstName}</Text>
            <Text className='text-gray-400'>{user?.email}</Text>
          </View>
        </View>

        {/* Business Profile Section */}
        {user?.userRole === 'SERVICE_PROVIDER' && (
          <>

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
          </>
        )}

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
