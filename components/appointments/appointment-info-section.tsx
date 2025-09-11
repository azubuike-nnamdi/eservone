import { Appointment } from '@/constants/types';
import { useCurrency } from '@/context/currency-context';
import { getDeliveryTypeDisplay } from '@/lib/helper';
import { useAuthStore } from '@/store/auth-store';
import React from 'react';
import { Text, View } from 'react-native';

export default function AppointmentInfoSection({ appointment }: { appointment: Appointment }) {
  const { format } = useCurrency();
  const user = useAuthStore((state) => state.user);
  const costValue = appointment.costOfService ? parseFloat(appointment.costOfService) : 0;
  const formattedCost = costValue > 0 ? format(costValue) : 'Price not set';
  const deliveryTypeDisplay = getDeliveryTypeDisplay(appointment.homeService, appointment.walkInService);
  const isProvider = user?.userRole === 'SERVICE_PROVIDER';

  return (
    <View className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <Text className="text-lg font-semibold text-black mb-3">Appointment Details</Text>

      <View className="space-y-2">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Date:</Text>
          <Text className="text-black">{new Date(appointment.appointmentDate).toLocaleDateString()}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Time:</Text>
          <Text className="text-black">{new Date(appointment.appointmentDate).toLocaleTimeString()}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Cost:</Text>
          <Text className="text-black font-semibold">{formattedCost}</Text>
        </View>

        {deliveryTypeDisplay && (
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Service Type:</Text>
            <Text className="text-black">{deliveryTypeDisplay}</Text>
          </View>
        )}

        {isProvider && (
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Has Pet:</Text>
            <Text className="text-black">{appointment.hasPet ? 'Yes' : 'No'}</Text>
          </View>
        )}

        {appointment.address && (
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Address:</Text>
            <Text className="text-black flex-1 text-right">{appointment.address}</Text>
          </View>
        )}

        {appointment.buzzCode && (
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Buzz Code:</Text>
            <Text className="text-black">{appointment.buzzCode}</Text>
          </View>
        )}

        {appointment.additionalDetails && (
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Additional Details:</Text>
            <Text className="text-black flex-1 text-right">{appointment.additionalDetails}</Text>
          </View>
        )}
      </View>
    </View>
  )
} 