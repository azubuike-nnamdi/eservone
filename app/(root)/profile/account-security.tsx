import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, View, Text } from 'react-native'
import ProfileHeader from '@/components/common/profile-header'
import ProfileChangePassword from '@/components/profile/profile-change-password'
export default function AccountSecurity() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <ProfileHeader title='Account security' showNotification={false} />
        <View className="border-b border-gray-100 my-3" />

        <View className='flex-1 justify-center items-center'>
          <Text className='text-black/50 text-center mx-auto text-2xl'>For added security, we recommend periodically
            reviewing your account activity. If you notice
            anything suspicious, please change your
            password immediately.</Text>
        </View>

        <View>
          <ProfileChangePassword />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}