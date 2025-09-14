import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, ScrollViewProps, View } from 'react-native';

interface KeyboardAwareScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
  className?: string;
  contentContainerClassName?: string;
  keyboardVerticalOffset?: number;
}

export default function KeyboardAwareScrollView({
  children,
  className = '',
  contentContainerClassName = '',
  keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0,
  ...scrollViewProps
}: KeyboardAwareScrollViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={`flex-1 ${className}`}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        <View className={`flex-1 ${contentContainerClassName}`}>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
