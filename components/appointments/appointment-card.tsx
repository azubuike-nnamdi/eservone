import { Appointment } from '@/constants/types'
import { useCurrency } from '@/context/currency-context'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface AppointmentCardProps {
  type: 'upcoming' | 'history'
  appointment: Appointment
  onPress?: () => void
}

export default function AppointmentCard({ type, appointment, onPress }: AppointmentCardProps) {
  const { format } = useCurrency();
  const formattedCost = format(parseFloat(appointment.costOfService));

  const dateObj = new Date(appointment.appointmentDate);
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const day = dateObj.getDate();
  const time = dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const provider = 'XYZ Studios'; // Placeholder, replace with real provider if available
  const rating = 5.0; // Placeholder, replace with real rating if available

  const faded = type === 'history';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center rounded-xl border border-gray-200 mb-3 ${faded ? 'bg-zinc-50 opacity-60' : 'bg-white'} p-0`}
      style={{ minHeight: 80 }}
      activeOpacity={0.85}
    >
      {/* Date Box */}
      <View className={`h-full px-4 py-3 items-center justify-center rounded-l-xl ${faded ? 'bg-zinc-100' : 'bg-primary-100'}`} style={{ minWidth: 64 }}>
        <Text className={`text-base font-bold ${faded ? 'text-zinc-400' : 'text-primary-500'}`}>{month} {day}</Text>
        <Text className={`text-xs mt-1 ${faded ? 'text-zinc-400' : 'text-primary-400'}`}>{time}</Text>
      </View>
      {/* Details */}
      <View className="flex-1 px-4 py-3 justify-center">
        <Text className={`text-base font-bold mb-1 ${faded ? 'text-zinc-400' : 'text-black'}`} numberOfLines={1}>{appointment.serviceName}</Text>
        <Text className={`text-xs mb-1 ${faded ? 'text-zinc-300' : 'text-zinc-500'}`} numberOfLines={1}>{provider}</Text>
        <Text className={`text-xs ${faded ? 'text-zinc-400' : 'text-zinc-500'}`}>Price: <Text className="font-bold text-black">{formattedCost}</Text></Text>
      </View>
      {/* Chevron or Rating */}
      <View className="flex-row items-center pr-4">
        {type === 'history' ? (
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#FFD700" style={{ marginRight: 2 }} />
            <Text className="text-xs font-bold text-zinc-500">{rating.toFixed(1)}</Text>
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={22} color="#B0B0B0" />
        )}
      </View>
    </TouchableOpacity>
  )
}