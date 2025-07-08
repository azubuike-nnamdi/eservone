import ProfileHeader from '@/components/common/profile-header'
import ManageServicesDashboard from '@/components/profile/manage-services-dashboard'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ManageServices() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ProfileHeader title='Manage services' showNotification={false} showBackArrow={true} />
      <ManageServicesDashboard />
    </SafeAreaView>
  )
}
