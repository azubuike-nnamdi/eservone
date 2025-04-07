import ProfileHeader from '@/components/common/profile-header'
import ProfileSupport from '@/components/profile/support'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function Support() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=''>
        <ProfileHeader title='Support' showNotification={false} />

        <View className='px-7'>
          <ProfileSupport />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
