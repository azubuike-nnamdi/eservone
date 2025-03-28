import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, View } from 'react-native'
import ProfileHeader from '@/components/common/profile-header'
import ProfileSupport from '@/components/profile/support'
export default function Support() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <ProfileHeader title='Support' showNotification={false} />

        <View className='flex-1'>
          <ProfileSupport />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
