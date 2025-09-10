import ProfileHeader from '@/components/common/profile-header'
import CertificateLanding from '@/components/profile/certificate-landing'
import CertificatesUploaded from '@/components/profile/certificates-uploaded'
import { useGetIndustrialCertificate } from '@/hooks/query/useGetIndustrialCertificate'
// import CertificateLanding from '@/components/profile/certificate-landing'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Certificates() {
  const { data, isPending, isError, error } = useGetIndustrialCertificate()


  const certificates = data?.data ?? []


  if (isPending) {
    return (
      <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-1'>
          <ProfileHeader title='Industrial Certificates' showNotification={false} showBackArrow={true} />
          <ActivityIndicator size="large" color="#7C6AED" />
        </View>
      </SafeAreaView>
    )
  }

  if (isError) {
    return (
      <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-1'>
          <ProfileHeader title='Industrial Certificates' showNotification={false} showBackArrow={true} />
          <Text>{error?.message}</Text>
        </View>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1'>
        <ProfileHeader title='Industrial Certificates' showNotification={false} showBackArrow={true} />
        {certificates?.length > 0 ? <CertificatesUploaded certificates={certificates} /> : <CertificateLanding />}
      </View>
    </SafeAreaView>
  )
}
