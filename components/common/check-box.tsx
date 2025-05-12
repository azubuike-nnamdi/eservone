import { cn } from '@/lib/utils'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  containerClassName?: string
  labelClassName?: string
}

export default function Checkbox({
  label,
  checked,
  onChange,
  containerClassName = '',
  labelClassName = '',
}: CheckboxProps) {
  return (
    <TouchableOpacity
      className={cn('flex-row items-center py-2', containerClassName)}
      onPress={() => onChange(!checked)}
    >
      <View
        className={cn(
          'size-5 border-2 rounded mr-3 justify-center items-center',
          checked ? 'border-primary-500 bg-primary-500' : 'border-gray-400 bg-white'
        )}
      >
        {checked && (
          <Ionicons
            name="checkmark"
            size={16}
            color="black"
            className='font-bold'
          />
        )}
      </View>
      <Text className={cn('text-base text-gray-700', labelClassName)}>{label}</Text>
    </TouchableOpacity>
  )
} 