import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import ProfileHeader from '@/components/common/profile-header'

export default function ManageServices() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <ProfileHeader title='Manage services' showNotification={false} />
      </ScrollView>
    </SafeAreaView>
  )
}
