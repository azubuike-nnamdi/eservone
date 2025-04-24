import ProfileHeader from '@/components/common/profile-header'
import EarningsDashboard from '@/components/profile/earnings-dashboard'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Earnings() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ProfileHeader title='Earnings' showNotification={false} />
      <EarningsDashboard />
    </SafeAreaView>
  )
}
