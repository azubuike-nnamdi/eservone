import ProfileHeader from '@/components/common/profile-header'
import ManageServicesDashboard from '@/components/profile/manage-services-dashboard'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ManageServices() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=''>
        <ProfileHeader title='Manage services' showNotification={false} />
        <ManageServicesDashboard />
      </ScrollView>
    </SafeAreaView>
  )
}
