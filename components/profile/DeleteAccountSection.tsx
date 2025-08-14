import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DeleteAccountSectionProps {
  onDeletePress: () => void;
}

export default function DeleteAccountSection({ onDeletePress }: DeleteAccountSectionProps) {
  return (
    <TouchableOpacity
      className="flex-row justify-between items-center py-4 mt-4"
      onPress={onDeletePress}
    >
      <View>
        <View className="flex-row items-center gap-5 justify-between">
          <Text className="text-lg font-semibold text-red-500">Delete account</Text>
          <Ionicons name="trash-outline" size={15} color="#EE3137" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
