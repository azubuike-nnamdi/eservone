import ProfileHeader from '@/components/common/profile-header'
import GeneralSetting from '@/components/profile/general-setting'
import { generalSettings, legalSettings, supportSettings } from '@/constants/data'
import { CERTIFICATES, EARNINGS, MANAGE_SERVICES, SIGN_IN } from '@/constants/routes'
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails'
import { useAuthStore } from '@/store/auth-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  const { clearAuth, user, isAuthenticated } = useAuthStore()
  const { data: userProfileDetails } = useGetUserProfileDetails();

  const isBusinessProfile = userProfileDetails?.data?.businessAccount
  console.log('isBusinessProfile', isBusinessProfile)

  const fullName = `${userProfileDetails?.data?.firstName} ${userProfileDetails?.data?.lastName}`
  const handleSignOut = async () => {
    clearAuth()
    await AsyncStorage.removeItem('requestId')
    router.replace(SIGN_IN)
  }

  if (!isAuthenticated) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 font-rubikMedium">Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 '>
        <ProfileHeader title='My profile' showNotification={false} showCurrency={true} showBackArrow={true} />

        <View className='px-7'>
          {/* User Profile Section */}
          <View className='flex-row items-center mt-6 mb-8'>
            <Image
              source={{ uri: userProfileDetails?.data?.profilePicture }}
              className='size-16 rounded-full bg-gray-100'
            />
            <View className='ml-4 flex-1'>
              <Text className='text-lg font-rubikMedium'>{fullName}</Text>
              <Text className='text-gray-400'>{userProfileDetails?.data?.emailAddress}</Text>
            </View>
          </View>

          {/* Business Profile Upgrade Section */}
          {isBusinessProfile === false && (
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
              <View className='bg-primary-300 rounded-lg py-3 px-4'>
                <Text
                  className='text-white text-center font-rubikMedium'
                // onPress={() => {
                //   router.push(BUSINESS_PROFILE)
                // }}
                >
                  Upgrade Now
                </Text>
              </View>
            </View>
          )}

          {/* Business Profile Section */}
          {user?.userRole === 'SERVICE_PROVIDER' && (
            <>
              {/* <View className='mb-4'>
                <GeneralSetting
                  title='Business profile - [ XYZ Studios ]'
                  showArrow={false}
                  href={BUSINESS_PROFILE}
                />
              </View> */}

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
            <Text className='text-lg font-rubikMedium mb-4'>General</Text>
            {generalSettings.map((setting) => (
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
            <Text className='text-lg font-rubikMedium mb-4'>Legal</Text>
            {legalSettings.map((setting) => (
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
            <Text className='text-lg font-rubikMedium mb-4'>Support</Text>
            {supportSettings.map((setting) => (
              <GeneralSetting
                key={setting.id}
                title={setting.title}
                showArrow={false}
                href={setting.href}
              />
            ))}
          </View>

          {/* Sign Out Button */}
          <View className='mt-8'>
            <Text
              className='text-red-500 text-center font-rubikMedium'
              onPress={handleSignOut}
            >
              Sign Out
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
