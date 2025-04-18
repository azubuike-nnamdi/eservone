import ProfileHeader from '@/components/common/profile-header'
import EarningsDashboard from '@/components/profile/earnings-dashboard'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Earnings() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=''>
        <ProfileHeader title='Earnings' showNotification={false} />
        <EarningsDashboard />
      </ScrollView>
    </SafeAreaView>
  )
}
