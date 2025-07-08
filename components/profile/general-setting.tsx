import icons from '@/constants/icons'
import { Href, router } from 'expo-router'
import React from 'react'
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native'

interface GeneralSettingProps {
  icon?: ImageSourcePropType
  title: string
  onPress?: () => void
  textStyle?: string
  showArrow?: boolean
  href?: Href
}

export default function GeneralSetting({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
  href
}: GeneralSettingProps) {
  const ContentComponent = (
    <TouchableOpacity
      onPress={href ? () => router.push(href) : onPress}
      className='flex flex-row items-center justify-between py-3 border-b border-gray-100'
    >
      <View className='flex flex-row items-center gap-3'>
        {icon && <Image source={icon} className='size-6' />}
        <Text className={`text-base text-black-300 font-montserratLight ${textStyle}`}>{title}</Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className='size-5' />}
    </TouchableOpacity>
  )

  return ContentComponent
}
