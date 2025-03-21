import ProfileHeader from '@/components/common/profile-header'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileInformation() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <ProfileHeader title='Profile information' showNotification={false} />
      </ScrollView>
    </SafeAreaView>
  )
}
