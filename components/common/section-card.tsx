import { SectionCardProps } from '@/constants/types';
import React from 'react';
import { Text, View } from 'react-native';

export default function SectionCard({ title, description, paragraphs }: SectionCardProps) {
  return (
    <View className='mt-6'>
      {title && (
        <Text className='text-xl font-bold text-black-300'>{title}</Text>
      )}
      {description && (
        <Text className='text-base text-black-300 mt-1'>{description}</Text>
      )}
      {paragraphs.map((paragraph, index) => (
        <Text key={index} className='text-base text-black-300 mt-4'>
          {paragraph}
        </Text>
      ))}
    </View>
  );
} 