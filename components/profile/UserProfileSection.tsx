

import UserBadge from '@/components/common/UserBadge';
import { useAuthStore } from '@/store/auth-store';
import React from 'react';
import { Text, View } from 'react-native';
import ProfileImageUpload from './ProfileImageUpload';

interface UserProfileSectionProps {
  userProfileDetails: any;
  onImageUpload: (uri: string) => void;
  isUpdatePending: boolean;
  imageUploadModalVisible: boolean;
  setImageUploadModalVisible: (visible: boolean) => void;
}

export default function UserProfileSection({
  userProfileDetails,
  onImageUpload,
  isUpdatePending,
  imageUploadModalVisible,
  setImageUploadModalVisible
}: UserProfileSectionProps) {
  const fullName = `${userProfileDetails?.data?.firstName} ${userProfileDetails?.data?.lastName}`;
  const user = useAuthStore()

  return (
    <View className='flex-row items-center mt-6 mb-8'>
      <ProfileImageUpload
        currentImageUri={userProfileDetails?.data?.profilePicture}
        onImageSelected={(uri: string) => {
          setImageUploadModalVisible(true);
        }}
        onImageUpload={onImageUpload}
        size={64}
        className="size-16"
        showUploadButton={true}
        isModalVisible={imageUploadModalVisible}
        onModalClose={() => setImageUploadModalVisible(false)}
        isUploading={isUpdatePending}
      />
      <View className='ml-4 flex-1'>
        <View className='flex-row items-center'>
          <Text className='text-lg font-rubikMedium'>{fullName}</Text>
          <UserBadge
            isBusiness={user?.user?.isBusiness}
            isIndustryCertificateVerified={user?.user?.isIndustryCertificateVerified}
          />
        </View>
        <Text className='text-gray-400'>{userProfileDetails?.data?.emailAddress}</Text>
      </View>
    </View>
  );
}
