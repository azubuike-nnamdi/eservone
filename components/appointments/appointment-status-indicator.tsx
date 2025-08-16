import { Appointment } from "@/constants/types";
import React from "react";
import { Text, View } from "react-native";

interface AppointmentStatusIndicatorProps {
  appointment: Appointment;
}

const AppointmentStatusIndicator: React.FC<AppointmentStatusIndicatorProps> = ({ appointment }) => {
  // Check both statuses to determine the correct message and styling
  const isAppointmentPending = appointment.serviceAppointmentStatus === 'PENDING';
  const isServicePending = appointment.serviceStatus === 'PENDING';
  const isCompleted = appointment.serviceStatus === 'COMPLETED';
  const isCanceled = appointment.serviceStatus === 'CANCELED';

  // Determine status message and styling based on both statuses
  const getStatusInfo = () => {
    if (isCanceled) {
      return {
        message: 'Service Canceled',
        color: 'red',
        bgColor: 'bg-red-500',
        textColor: 'text-red-700'
      };
    }

    if (isCompleted) {
      return {
        message: 'Service Completed',
        color: 'green',
        bgColor: 'bg-green-500',
        textColor: 'text-green-700'
      };
    }

    // If serviceAppointmentStatus is PENDING, service hasn't been approved yet
    if (isAppointmentPending) {
      return {
        message: 'Booking is yet to be approved',
        color: 'yellow',
        bgColor: 'bg-yellow-500',
        textColor: 'text-yellow-700'
      };
    }

    // If serviceAppointmentStatus is not PENDING but serviceStatus is PENDING
    if (isServicePending) {
      return {
        message: 'Booking is accepted and in progress...',
        color: 'blue',
        bgColor: 'bg-blue-500',
        textColor: 'text-blue-700'
      };
    }

    // Fallback
    return {
      message: appointment.serviceStatus || 'Unknown Status',
      color: 'gray',
      bgColor: 'bg-gray-500',
      textColor: 'text-gray-700'
    };
  };

  const statusInfo = getStatusInfo();


  return (
    <View className="bg-gray-50 p-4 rounded-lg mb-6">
      <Text className="text-gray-400 text-xs mb-1">Status:</Text>
      <View className="flex-row items-center">
        <View className={`w-3 h-3 rounded-full mr-2 ${statusInfo.bgColor}`} />
        <Text className={`text-base font-semibold ${statusInfo.textColor}`}>
          {statusInfo.message}
        </Text>
      </View>
    </View>
  );
};

export default AppointmentStatusIndicator; 