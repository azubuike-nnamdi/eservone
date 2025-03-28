import ProfileHeader from '@/components/common/profile-header'
import PreferencesScreen from '@/components/profile/preferences'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AccountPreference() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <ProfileHeader title='Account preferences' showNotification={false} />

        <View>
          <PreferencesScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
