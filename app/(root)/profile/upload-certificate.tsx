import ProfileHeader from '@/components/common/profile-header';
import AddCertificateForm from '@/components/profile/add-certificate-form';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function UploadCertificate() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1'>
        <ProfileHeader title='Add Certificate' showNotification={false} />

        <AddCertificateForm />
      </View>
    </SafeAreaView>
  )
}