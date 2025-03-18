import AuthHeader from '@/components/common/auth-header'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignUp() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-between">
        <AuthHeader title="Create your free account" />
      </View>
    </SafeAreaView>
  )
}
