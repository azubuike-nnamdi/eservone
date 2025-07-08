import { useCurrency } from '@/context/currency-context'
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface ProfileHeaderProps {
  title: string
  showBackArrow?: boolean
  showNotification?: boolean
  showCurrency?: boolean
  onBackPress?: () => void
  onNotificationPress?: () => void
  rightComponent?: React.ReactNode
  backDestination?: string
}

export default function ProfileHeader({
  title,
  showBackArrow = true,
  showNotification = false,
  showCurrency = true,
  onBackPress,
  onNotificationPress,
  rightComponent,
  backDestination
}: ProfileHeaderProps) {
  const { data: userProfileDetails } = useGetUserProfileDetails()
  const { currency } = useCurrency()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else if (backDestination) {
      router.push(backDestination as any)
    } else {
      router.back()
    }
  }

  return (
    <View className="flex-row items-center justify-between py-4 px-5 border-b border-gray-200">
      {/* Left Section */}
      <View className="flex-row items-center flex-1">
        {showBackArrow && (
          <TouchableOpacity onPress={handleBackPress} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        )}
        <Text className="text-xl font-semibold text-black flex-1">{title}</Text>
      </View>

      {/* Right Section */}
      <View className="flex-row items-center">
        {showCurrency && currency && (
          <View className="mr-4">
            <Text className="text-sm p-1 rounded-md text-black bg-slate-300">{currency}</Text>
          </View>
        )}

        {showNotification && (
          <TouchableOpacity onPress={onNotificationPress} className="mr-4">
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
        )}

        {rightComponent}
      </View>
    </View>
  )
}
