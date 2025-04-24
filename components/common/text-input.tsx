import { cn } from '@/lib/utils'; // Assuming you have a utility like clsx or tailwind-merge
import React from 'react';
import { TextInput as RNTextInput, Text, TextInputProps, View } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label?: string
  error?: string
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
}

export default function TextInput({
  label,
  error,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  ...props
}: CustomTextInputProps) {
  return (
    <View className={cn('mb-4', containerClassName)}>
      {label && (
        <Text className={cn('text-sm font-rubikMedium text-gray-700 mb-2', labelClassName)}>
          {label}
        </Text>
      )}
      <RNTextInput
        className={cn(
          'border rounded-lg p-4 text-base bg-gray-50', // Adjusted padding and background
          error ? 'border-red-500' : 'border-gray-300 focus:border-primary-500', // Added focus state
          inputClassName
        )}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <Text className={cn('text-red-500 text-sm mt-1', errorClassName)}>
          {error}
        </Text>
      )}
    </View>
  )
} 