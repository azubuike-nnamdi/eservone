import Button from '@/components/common/button'
import ProfileHeader from '@/components/common/profile-header'
import VersionDisplay from '@/components/common/version-display'
import DeleteAccountModal from '@/components/profile/delete-profile'
import GeneralSetting from '@/components/profile/general-setting'
import ProfileImageModal from '@/components/profile/ProfileImageModal'
import { generalSettings, legalSettings, supportSettings } from '@/constants/data'
import { CERTIFICATES, CREATE_BUSINESS, EARNINGS, MANAGE_SERVICES, SIGN_IN, WALLETS } from '@/constants/routes'
import useDeleteMyProfile from '@/hooks/mutation/useDeleteMyProfile'
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails'
import { getProfileImageUri } from '@/lib/helper'
import { useAuthStore } from '@/store/auth-store'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  const { clearAuth, user, isAuthenticated } = useAuthStore()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)


  const { handleDeleteProfile, isPending } = useDeleteMyProfile()
  const { data: userProfileDetails } = useGetUserProfileDetails();

  const isBusinessProfile = userProfileDetails?.data?.businessAccountVerified


  const fullName = `${userProfileDetails?.data?.firstName} ${userProfileDetails?.data?.lastName}`
  const handleSignOut = async () => {
    clearAuth()
    await AsyncStorage.removeItem('requestId')
    router.replace(SIGN_IN)
  }

  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteConfirm = () => {
    handleDeleteProfile({ email: user?.email || "" })

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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={{ uri: getProfileImageUri(userProfileDetails?.data?.profilePicture) }}
                className='size-16 rounded-full bg-gray-100'
              />
            </TouchableOpacity>
            <View className='ml-4 flex-1'>
              <Text className='text-lg font-rubikMedium'>{fullName}</Text>
              <Text className='text-gray-400'>{userProfileDetails?.data?.emailAddress}</Text>
            </View>
          </View>

          {/* Business Profile Upgrade Section */}
          {user?.userRole === 'SERVICE_PROVIDER' && isBusinessProfile === false && (
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
              <Button className='bg-primary-300 rounded-lg py-3 px-4' onPress={() => {
                router.push(CREATE_BUSINESS)
              }}>
                <Text
                  className='text-white text-center font-rubikMedium'

                >
                  Upgrade Now
                </Text>
              </Button>
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
                {/* Earnings moved to General section */}
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
            <Text className='text-xl font-bold mb-4'>General</Text>
            {generalSettings.map((setting) => (
              <GeneralSetting
                key={setting.id}
                title={setting.title}
                showArrow={false}
                href={setting.href}
              />
            ))}
            <GeneralSetting
              title='Earnings'
              showArrow={false}
              href={EARNINGS}
            />
            <GeneralSetting
              title='Wallet'
              showArrow={false}
              href={WALLETS}
            />

          </View>

          {/* Legal Section */}
          <View className='mb-4'>
            <Text className='text-xl font-bold mb-4'>Legal</Text>
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
            <Text className='text-xl font-bold mb-4'>Support</Text>
            {supportSettings.map((setting) => (
              <GeneralSetting
                key={setting.id}
                title={setting.title}
                showArrow={false}
                href={setting.href}
              />
            ))}
          </View>

          <TouchableOpacity
            className="flex-row justify-between items-center py-4 mt-4"
            onPress={() => setDeleteModalVisible(true)}
          >
            <View>
              <View className="flex-row items-center gap-5  justify-between ">
                <Text className="text-lg font-semibold text-red-500">Delete account</Text>
                <Ionicons name="trash-outline" size={15} color="#EE3137" />
              </View>

            </View>
          </TouchableOpacity>
        </View>

        {/* Delete Account Modal */}
        <DeleteAccountModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={handleDeleteConfirm}
          isPending={isPending}
        />

        {/* Sign Out Button */}
        <View className='mt-8'>
          <Text
            className='text-red-500 text-center font-rubikMedium'
            onPress={handleSignOut}
          >
            Sign Out
          </Text>
        </View>

        {/* Version Display */}
        <View className='mt-4 mb-8'>
          <VersionDisplay />
        </View>

      </ScrollView>

      {/* Fullscreen Profile Image Modal */}
      <ProfileImageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        imageUri={getProfileImageUri(userProfileDetails?.data?.profilePicture) || ""}
      />
    </SafeAreaView>
  )
}
