import { Appointment } from '@/constants/types';
import { useCurrency } from '@/context/currency-context';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function AppointmentItem({ appointment, onPress }: { appointment: Appointment; onPress: () => void }) {
  const { format } = useCurrency();
  const formattedCost = format(parseFloat(appointment.costOfService));



  return (
    <TouchableOpacity onPress={onPress} className="bg-white p-4 rounded-xl border border-gray-200 mb-4 mx-4 flex-row items-center" style={{ elevation: 2 }}>
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold text-black flex-1" numberOfLines={1}>{appointment.serviceName}</Text>
          <View className={`px-3 py-1 rounded-full ml-2 ${appointment.serviceStatus === 'COMPLETED' ? 'bg-green-100' : appointment.serviceStatus === 'CANCELED' ? 'bg-red-100' : 'bg-yellow-400'}`}
            style={{ minWidth: 80, alignItems: 'center' }}>
            <Text className={`text-xs font-semibold uppercase ${appointment.serviceStatus === 'COMPLETED' ? 'text-green-700' : appointment.serviceStatus === 'CANCELED' ? 'text-red-700' : 'text-black'}`}>
              {appointment.serviceStatus}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center mb-1">
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={16} color="#888" style={{ marginRight: 4 }} />
            <Text className="text-gray-600 text-sm">
              {new Date(appointment.appointmentDate).toLocaleDateString()} {new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>
        {appointment.address && (
          <Text className="text-gray-500 text-xs mb-1" numberOfLines={1}>
            📍 {appointment.address}
          </Text>
        )}
        <View className="flex-row justify-between items-end mt-2">
          <Text className="text-primary-300 font-extrabold text-lg">
            {formattedCost}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#B0B0B0" style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  )
} 