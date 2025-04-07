import ProfileHeader from '@/components/common/profile-header'
import CertificateLanding from '@/components/profile/certificate-landing'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Certificates() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1'>
        <ProfileHeader title='Industrial Certificates' showNotification={false} />
        <CertificateLanding />
      </View>
    </SafeAreaView>
  )
}
