import { getAppVersion } from '@/lib/utils'
import React from 'react'
import { Text, View } from 'react-native'

interface VersionDisplayProps {
  showLabel?: boolean
  className?: string
  textClassName?: string
}

export default function VersionDisplay({
  showLabel = true,
  className = "items-center",
  textClassName = "text-gray-400 text-xs"
}: VersionDisplayProps) {
  const version = getAppVersion()

  return (
    <View className={className}>
      <Text className={textClassName}>
        {showLabel ? `Version ${version.fullVersion}` : version.fullVersion}
      </Text>
    </View>
  )
} 