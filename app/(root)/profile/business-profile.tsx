import ProfileHeader from '@/components/common/profile-header'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function BusinessProfile() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=''>
        <ProfileHeader title='Business profile' showNotification={false} showBackArrow={true} />
      </ScrollView>
    </SafeAreaView>
  )
}
