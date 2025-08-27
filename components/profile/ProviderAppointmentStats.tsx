import React from 'react';
import { Text, View } from 'react-native';

interface ProviderAppointmentStatsProps {
  completedAppointments: number;
  pendingAppointments: number;
}

export default function ProviderAppointmentStats({
  completedAppointments,
  pendingAppointments
}: ProviderAppointmentStatsProps) {
  return (
    <View className="flex-row space-x-4 mb-6">
      <View className="flex-1 bg-gray-100 rounded-lg p-4">
        <Text className="text-gray-600 text-sm text-center">Total completed appointments</Text>
        <Text className="text-black font-bold text-2xl text-center mt-2">{completedAppointments}</Text>
      </View>
      <View className="flex-1 bg-gray-100 rounded-lg p-4">
        <Text className="text-gray-600 text-sm text-center">Total pending appointments</Text>
        <Text className="text-black font-bold text-2xl text-center mt-2">{pendingAppointments}</Text>
      </View>
    </View>
  );
}
