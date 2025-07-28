import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface WalletCardProps {
  balance: string | number
  currency?: string
  onPress?: () => void
  showChevron?: boolean
  className?: string
}

export default function WalletCard({
  balance,
  currency,
  onPress,
  showChevron = true,
  className = ''
}: WalletCardProps) {
  const CardContent = (
    <View className={`bg-[#ECECF5] mx-3 rounded-lg mt-4 ${className}`}>
      <View className="bg-primary-50 rounded-xl p-4 shadow-sm relative">
        <Text className="text-sm text-primary-900 mb-1">EservOne Wallet Balance:</Text>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-primary-900">{currency} {balance}</Text>
            <Text className="text-sm text-primary-900/50 mb-1">Last payment received: <Text className="font-semibold text-primary-600">24th Aug, 2024</Text></Text>
          </View>
          {showChevron && <Ionicons name="chevron-forward" size={24} color="#7C6AED" />}
        </View>
      </View>
    </View>
  )

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        {CardContent}
      </TouchableOpacity>
    )
  }

  return CardContent
} 