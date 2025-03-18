import { cn } from '@/lib/utils';
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';


interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  type?: 'submit' | 'button';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  textClassName?: string;
}

export default function Button({
  onPress,
  children,
  type = 'button',
  disabled = false,
  loading = false,
  loadingText = 'Please wait...',
  variant = 'primary',
  className = '',
  textClassName = '',
}: ButtonProps) {
  const baseStyles = 'w-full h-14 rounded-md justify-center items-center';
  const variantStyles = {
    primary: 'bg-primary-300',
    secondary: 'bg-gray-100',
    outline: 'border border-primary-300',
  };

  const textStyles = {
    primary: 'text-white',
    secondary: 'text-gray-900',
    outline: 'text-primary-300',
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        isDisabled && 'opacity-50',
        className
      )}
    >
      {loading ? (
        <View className="flex-row items-center space-x-2 gap-2">
          <ActivityIndicator color={variant === 'outline' ? '#4338CA' : '#ffffff'} />
          <Text
            className={cn(
              'text-base font-semibold',
              textStyles[variant],
              textClassName
            )}
          >
            {loadingText}
          </Text>
        </View>
      ) : (
        <Text
          className={cn(
            'text-base font-semibold',
            textStyles[variant],
            textClassName
          )}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
} 