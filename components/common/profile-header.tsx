import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import icons from '@/constants/icons'
import { ProfileHeaderProps } from '@/constants/types'


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
    <View className='flex flex-row justify-between items-center mt-7 '>
      <View className='flex flex-row gap-3 items-center'>
        {showBackArrow && (
          <TouchableOpacity onPress={handleBackPress}>
            <Image source={icons.backArrow} className='size-8' />
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
  )
}
