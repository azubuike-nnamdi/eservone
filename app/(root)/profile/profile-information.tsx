import UserBioModal from '@/components/appointments/user-bio-modal'
import ProfileHeader from '@/components/common/profile-header'
import useUpdateUserBio from '@/hooks/mutation/useUpdateUserBio'
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails'
import { formatDate } from '@/lib/helper'
import { useAuthStore } from '@/store/auth-store'
import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileInformation() {
  const { user } = useAuthStore();
  const { data: userProfileDetails } = useGetUserProfileDetails()
  const { handleUpdateUserBio, isPending } = useUpdateUserBio()

  const fullName = `${userProfileDetails?.data?.firstName} ${userProfileDetails?.data?.lastName}`

  const [showBioModal, setShowBioModal] = useState(false);
  const [bio, setBio] = useState(userProfileDetails?.data?.userBio || "");

  // Keep bio in sync with profile details
  React.useEffect(() => {
    setBio(userProfileDetails?.data?.userBio || "");
  }, [userProfileDetails?.data?.userBio]);

  const handleBioSubmit = (newBio: string) => {
    setBio(newBio);
    setShowBioModal(false);
    handleUpdateUserBio({ userBio: newBio })
  };

  const { firstName, lastName, email } = user || {};
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=''>
        <ProfileHeader title='Profile information' showNotification={false} showBackArrow={true} />

        <View className='px-7'>
          {/* Profile Picture and Basic Info */}
          <View className='items-left mt-6'>
            <View className='w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-4'>
              <Feather name="user" size={40} color="#6B7280" />
            </View>
            <Text className='text-2xl font-semibold'>{fullName}</Text>
            <View className='flex-row items-center mt-2'>
              <Text className='text-gray-600'>{userProfileDetails?.data?.emailAddress}</Text>
              <Text className='text-gray-400 mx-2'>•</Text>
              <Text className='text-gray-600'>Joined {formatDate(userProfileDetails?.data?.dateCreated)}</Text>
            </View>
          </View>

          {/* Bio Section */}
          <View className='mt-8'>
            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-xl font-semibold'>Bio</Text>
              <Feather name="edit-2" size={15} color="#6B7280" onPress={() => setShowBioModal(true)} />
            </View>
            <Text className='text-gray-600 leading-6'>
              {bio}
            </Text>
          </View>

          {/* Home Address Section */}
          <View className='mt-8'>
            <View className='flex-row justify-between items-center mb-2'>
              <Text className='text-xl font-semibold'>Home address</Text>
              <Feather name="edit-2" size={15} color="#6B7280" />
            </View>
            <Text className='text-gray-600'>{userProfileDetails?.data?.address}</Text>
          </View>
        </View>

      </ScrollView>
      <UserBioModal
        visible={showBioModal}
        onClose={() => setShowBioModal(false)}
        onSubmit={handleBioSubmit}
        initialBio={bio}
        isLoading={isPending}
      />
    </SafeAreaView>
  )
}
