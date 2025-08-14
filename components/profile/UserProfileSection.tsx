

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
        <Text className='text-lg font-rubikMedium'>{fullName}</Text>
        <Text className='text-gray-400'>{userProfileDetails?.data?.emailAddress}</Text>
      </View>
    </View>
  );
}
