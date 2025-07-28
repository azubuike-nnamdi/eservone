import ProfileHeader from '@/components/common/profile-header'
import WalletDashboard from '@/components/profile/wallet-dashboard'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Wallet() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ProfileHeader title='Wallet' showNotification={false} showBackArrow={true} />
      <WalletDashboard />
    </SafeAreaView>
  )
}
