import icons from '@/constants/icons'
import { ProfileHeaderProps } from '@/constants/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'


export default function ProfileHeader({
  title,
  showBackArrow = true,
  showNotification = true,
  onBackPress,
  onNotificationPress,
  rightComponent
}: ProfileHeaderProps) {
  const navigation = useNavigation()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  return (
    <View>
      <View className='flex flex-row justify-between items-center mt-7 px-7'>
        <View className='flex flex-row gap-3 items-center'>
          {showBackArrow && (
            <TouchableOpacity onPress={handleBackPress}>
              <Image source={icons.backArrow2} className='size-5' />
            </TouchableOpacity>
          )}
          <Text className='text-xl font-bold text-black-300'>{title}</Text>
        </View>

        {rightComponent || (
          showNotification && (
            <TouchableOpacity onPress={onNotificationPress}>
              <Image source={icons.bell} className='size-5' />
            </TouchableOpacity>
          )
        )}
      </View>
      <View className='border-b border-gray-100 mt-4' />
    </View>
  )
}
