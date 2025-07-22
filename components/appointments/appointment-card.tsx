import { Appointment } from '@/constants/types'
import { useCurrency } from '@/context/currency-context'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface AppointmentCardProps {
  type: 'upcoming' | 'history';
  appointment: Appointment;
  onPress?: () => void;
  noMargin?: boolean;
}

export default function AppointmentCard({ type, appointment, onPress, noMargin = false }: AppointmentCardProps) {
  const { format } = useCurrency();
  const formattedCost = format(parseFloat(appointment.costOfService));

  const dateObj = new Date(appointment.appointmentDate);
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const day = dateObj.getDate();
  const time = dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const provider = appointment.serviceStatus;
  const rating = 5.0;

  const faded = type === 'history';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center border border-gray-100 mb-4 rounded-lg ${faded ? 'bg-zinc-50 opacity-60 ' : 'bg-white'} ${noMargin ? '' : 'mb-3'}`}
      style={{ height: 70 }}
      activeOpacity={0.85}
    >
      {/* Date Box */}
      <View className={`h-full px-3 items-center justify-center ${faded ? 'bg-zinc-100' : 'bg-primary-100'}`} style={{ width: 55 }}>
        <Text className={`text-xs font-bold ${faded ? 'text-black-400' : 'text-primary-500'}`}>{month} {day}</Text>
        <Text className={`text-xs ${faded ? 'text-black-400' : 'text-primary-400'}`}>{time}</Text>
      </View>

      {/* Details */}
      <View className="flex-1 px-3 py-2 justify-center">
        <Text className={`text-sm font-bold mb-1 ${faded ? 'text-black-600' : 'text-black'}`} numberOfLines={1}>
          {appointment.serviceName}
        </Text>
        <Text className={`text-xs mb-1 ${faded ? 'text-black-300' : 'text-black-500'}`} numberOfLines={1}>
          {provider}
        </Text>
        <Text className={`text-xs ${faded ? 'text-black-400' : 'text-black-500'}`}>
          Price: <Text className="font-bold text-black">{formattedCost}</Text>
        </Text>
      </View>

      {/* Chevron or Rating */}
      <View className="flex-row items-center pr-3">
        {type === 'history' ? (
          <View className="flex-row items-center">
            <Ionicons name="star" size={12} color="#FFD700" style={{ marginRight: 2 }} />
            <Text className="text-xs font-bold text-zinc-500">{rating.toFixed(1)}</Text>
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={16} color="#B0B0B0" />
        )}
      </View>
    </TouchableOpacity>
  )
}