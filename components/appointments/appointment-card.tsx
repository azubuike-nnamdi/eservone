import { Appointment } from '@/constants/types'
import { useCurrency } from '@/context/currency-context'
import { getDeliveryTypeDisplay } from '@/lib/helper'
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
  const costValue = appointment.costOfService ? parseFloat(appointment.costOfService) : 0;
  const formattedCost = costValue > 0 ? format(costValue) : 'Price not set';

  const dateObj = new Date(appointment.appointmentDate);
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const day = dateObj.getDate();
  const time = dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const provider = appointment.serviceStatus;
  const reviewCount = appointment.reviewCount || 0;

  const faded = type === 'history';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center border border-gray-200 mb-4 rounded-xl ${faded ? 'bg-zinc-50 opacity-60 ' : 'bg-white'} ${noMargin ? '' : 'mb-3'}`}
      style={{ height: 70 }}
      activeOpacity={0.85}
    >
      {/* Date Box */}
      <View className={`h-full px-3 items-center justify-center mr-3 ${faded ? 'bg-zinc-200' : 'bg-primary-100'}`} style={{ width: 85 }}>
        <Text className={`text-xs font-bold ${faded ? 'text-black-400' : 'text-primary-500'}`}>{month} {day}</Text>
        <Text className={`text-xs ${faded ? 'text-black-400' : 'text-primary-400'}`}>{time}</Text>
      </View>

      {/* Details */}
      <View className="flex-1  justify-center">
        {appointment.serviceName && (
          <Text className={`text-xs mb-1 ${faded ? 'text-black-300' : 'text-black-500'}`} numberOfLines={1}>
            {appointment.serviceName}
          </Text>
        )}
        {provider && (
          <Text className={`text-xs mb-1 ${faded ? 'text-black-300' : 'text-black-500'}`} numberOfLines={1}>
            {provider}
          </Text>
        )}

        {/* Delivery Type */}
        {(appointment.homeService || appointment.walkInService) && (
          <View className="flex-row items-center mb-1">
            <Ionicons name="car-outline" size={12} color="#6B7280" />
            <Text className={`text-xs ml-1 ${faded ? 'text-black-400' : 'text-black-500'}`}>
              {getDeliveryTypeDisplay(appointment.homeService, appointment.walkInService)}
            </Text>
          </View>
        )}

        <Text className={`text-xs ${faded ? 'text-black-400' : 'text-black-500'}`}>
          Price: <Text className="font-bold text-black">{formattedCost}</Text>
        </Text>
      </View>

      {/* Review Count */}
      <View className="flex-row items-center pr-3">
        <View className="flex-row items-center">
          <Ionicons name="chatbubble-outline" size={12} color="#6B7280" style={{ marginRight: 2 }} />
          <Text className={`text-xs font-bold ${faded ? 'text-zinc-500' : 'text-zinc-600'}`}>
            {reviewCount} review{reviewCount !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}