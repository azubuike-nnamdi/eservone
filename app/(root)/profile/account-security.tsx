import ProfileHeader from '@/components/common/profile-header'
import ProfileChangePassword from '@/components/profile/profile-change-password'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function AccountSecurity() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName=''>
        <ProfileHeader title='Account security' showNotification={false} />


        <View className='px-7'>
          <View className='flex-1 justify-center items-center'>
            <Text className='text-black/50 text-center mx-auto text-xl'>For added security, we recommend periodically
              reviewing your account activity. If you notice
              anything suspicious, please change your
              password immediately.</Text>
          </View>

          <View>
            <ProfileChangePassword />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}