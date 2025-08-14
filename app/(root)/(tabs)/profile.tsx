import ProfileHeader from '@/components/common/profile-header'
import VersionDisplay from '@/components/common/version-display'
import BusinessProfileSection from '@/components/profile/BusinessProfileSection'
import BusinessProfileUpgrade from '@/components/profile/BusinessProfileUpgrade'
import DeleteAccountModal from '@/components/profile/delete-profile'
import DeleteAccountSection from '@/components/profile/DeleteAccountSection'
import ProfileImageModal from '@/components/profile/ProfileImageModal'
import ProfileSettings from '@/components/profile/SettingsSection'
import SignOutSection from '@/components/profile/SignOutSection'
import UserProfileSection from '@/components/profile/UserProfileSection'
import { SIGN_IN } from '@/constants/routes'
import useDeleteMyProfile from '@/hooks/mutation/useDeleteMyProfile'
import useUpdateProfile from '@/hooks/mutation/useUpdateProfile'
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails'
import { getProfileImageUri } from '@/lib/helper'
import { useAuthStore } from '@/store/auth-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  const { clearAuth, user, isAuthenticated } = useAuthStore()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [signOutModalVisible, setSignOutModalVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUploadModalVisible, setImageUploadModalVisible] = useState(false);

  const { handleDeleteProfile, isPending } = useDeleteMyProfile()
  const { data: userProfileDetails } = useGetUserProfileDetails();
  const { handleUpdateProfile, isPending: isUpdatePending, isSuccess: isUpdateSuccess } = useUpdateProfile()

  const isBusinessProfile = userProfileDetails?.data?.business

  // Close image upload modal on successful update
  useEffect(() => {
    if (isUpdateSuccess) {
      setImageUploadModalVisible(false);
    }
  }, [isUpdateSuccess]);

  const handleSignOut = async () => {
    clearAuth()
    await AsyncStorage.removeItem('requestId')
    router.replace(SIGN_IN)
  }

  const handleSignOutConfirm = () => {
    setSignOutModalVisible(false)
    handleSignOut()
  }

  const handleDeleteConfirm = () => {
    handleDeleteProfile({ email: user?.email || "" })
  }

  const handleImageUpload = async (uri: string) => {
    try {
      // Convert image to base64
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = async () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1]; // Remove data:image/...;base64, prefix

        // Get current user data for required fields
        const currentAddress = userProfileDetails?.data?.address || '';
        const currentPhone = userProfileDetails?.data?.phoneNumber || '';

        // Call the update profile hook with all required fields
        await handleUpdateProfile({
          address: currentAddress,
          meansOfIdentification: '', // Empty since we're only updating profile picture
          phoneNumber: currentPhone,
          profilePicture: base64Data
        });
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error processing image:', error);
    }
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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32'>
        <ProfileHeader title='My profile' showNotification={false} showCurrency={true} showBackArrow={true} />

        <View className='px-7'>
          {/* User Profile Section */}
          <UserProfileSection
            userProfileDetails={userProfileDetails}
            onImageUpload={handleImageUpload}
            isUpdatePending={isUpdatePending}
            imageUploadModalVisible={imageUploadModalVisible}
            setImageUploadModalVisible={setImageUploadModalVisible}
          />

          {/* Business Profile Upgrade Section */}
          <BusinessProfileUpgrade
            userRole={user?.userRole}
            isBusinessProfile={isBusinessProfile}
          />

          {/* Business Profile Section */}
          <BusinessProfileSection userRole={user?.userRole} />

          {/* Settings Sections */}
          <ProfileSettings />

          {/* Delete Account Section */}
          <DeleteAccountSection onDeletePress={() => setDeleteModalVisible(true)} />
        </View>

        {/* Delete Account Modal */}
        <DeleteAccountModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={handleDeleteConfirm}
          isPending={isPending}
        />

        {/* Sign Out Section */}
        <SignOutSection
          signOutModalVisible={signOutModalVisible}
          setSignOutModalVisible={setSignOutModalVisible}
          onSignOutConfirm={handleSignOutConfirm}
        />

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
