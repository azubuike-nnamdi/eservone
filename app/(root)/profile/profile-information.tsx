import UserBioModal from '@/components/appointments/user-bio-modal'
import KeyboardAwareScrollView from '@/components/common/keyboard-aware-scroll-view'
import ProfileHeader from '@/components/common/profile-header'
import ProfileImageModal from '@/components/profile/ProfileImageModal'
import useUpdateUserBio from '@/hooks/mutation/useUpdateUserBio'
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails'
import { formatDate } from '@/lib/helper'
import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileInformation() {

  const [modalVisible, setModalVisible] = useState(false);


  const { data: userProfileDetails } = useGetUserProfileDetails()
  const { handleUpdateUserBio, isPending } = useUpdateUserBio()


  const fullName = `${userProfileDetails?.data?.firstName} ${userProfileDetails?.data?.lastName}`

  const [showBioModal, setShowBioModal] = useState(false);
  const [bio, setBio] = useState(userProfileDetails?.data?.userBio || "");

  // Keep bio in sync with profile details
  React.useEffect(() => {
    setBio(userProfileDetails?.data?.userBio || "");
  }, [userProfileDetails?.data?.userBio]);

  const handleBioSubmit = (newBio: string, newAddress: string) => {
    setBio(newBio);
    setShowBioModal(false);
    handleUpdateUserBio({ userBio: newBio, userAddress: newAddress })
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <KeyboardAwareScrollView className="flex-1">
        <ProfileHeader title='Profile information' showNotification={false} showBackArrow={true} />

        <View className='px-7'>
          {/* Profile Picture and Basic Info */}
          <View className='items-left mt-6'>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={{ uri: userProfileDetails?.data?.profilePicture }}
                className='size-16 rounded-full bg-gray-100'
              />
            </TouchableOpacity>
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
              <Feather name="edit-2" size={15} color="#6B7280" onPress={() => setShowBioModal(true)} />
            </View>
            <Text className='text-gray-600'>{userProfileDetails?.data?.address}</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <UserBioModal
        visible={showBioModal}
        onClose={() => setShowBioModal(false)}
        onSubmit={handleBioSubmit}
        initialBio={bio}
        initialAddress={userProfileDetails?.data?.address || ""}
        isLoading={isPending}
      />

      <ProfileImageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        imageUri={userProfileDetails?.data?.profilePicture || ""}
      />
    </SafeAreaView>
  )
}
