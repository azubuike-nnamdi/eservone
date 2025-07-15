import ProfileHeader from '@/components/common/profile-header'
import CreateBusinessScreen from '@/components/profile/create-business-screen'
import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'

export default function CreateBusiness() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=''>
        <ProfileHeader title='Create business' showNotification={false} showBackArrow={true} />

        <View className='px-7'>
          <CreateBusinessScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}