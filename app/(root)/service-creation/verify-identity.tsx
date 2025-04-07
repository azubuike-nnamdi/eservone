import ProfileHeader from '@/components/common/profile-header'
import React from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native'
export default function VerifyIdentity() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ProfileHeader title='Verify Identity' showNotification={false} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}