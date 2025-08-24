import { Appointment } from "@/constants/types";
import React from "react";
import { Text, View } from "react-native";

interface AppointmentStatusIndicatorProps {
  appointment: Appointment;
}

const AppointmentStatusIndicator: React.FC<AppointmentStatusIndicatorProps> = ({ appointment }) => {
  // Check both statuses to determine the correct message and styling
  const isAppointmentPending = appointment.serviceAppointmentStatus === 'PENDING';
  const isAppointmentAccepted = appointment.serviceAppointmentStatus === 'ACCEPT';
  const isAppointmentDeclined = appointment.serviceAppointmentStatus === 'DECLINED';

  // Service completion status (only when both parties complete)
  const isServiceCompleted = appointment.seekerServiceStatus === 'COMPLETED' && appointment.providerServiceStatus === 'COMPLETED';
  const isServiceCanceled = appointment.serviceAppointmentStatus === 'CANCELED';

  // Individual completion status
  const hasSeekerCompleted = appointment.seekerServiceStatus === 'COMPLETED';
  const hasProviderCompleted = appointment.providerServiceStatus === 'COMPLETED';

  // Determine status message and styling based on both statuses
  const getStatusInfo = () => {
    if (isServiceCanceled) {
      return {
        message: 'Service Canceled',
        color: 'red',
        bgColor: 'bg-red-500',
        textColor: 'text-red-700'
      };
    }

    if (isServiceCompleted) {
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

    // If appointment is declined
    if (isAppointmentDeclined) {
      return {
        message: 'Booking was declined',
        color: 'red',
        bgColor: 'bg-red-500',
        textColor: 'text-red-700'
      };
    }

    // If appointment is accepted but service is in progress
    if (isAppointmentAccepted) {
      if (hasSeekerCompleted && hasProviderCompleted) {
        return {
          message: 'Service Completed',
          color: 'green',
          bgColor: 'bg-green-500',
          textColor: 'text-green-700'
        };
      } else if (hasSeekerCompleted || hasProviderCompleted) {
        return {
          message: 'Service in progress - waiting for completion',
          color: 'blue',
          bgColor: 'bg-blue-500',
          textColor: 'text-blue-700'
        };
      } else {
        return {
          message: 'Booking accepted - service ready to begin',
          color: 'blue',
          bgColor: 'bg-blue-500',
          textColor: 'text-blue-700'
        };
      }
    }

    // Fallback
    return {
      message: 'Unknown Status',
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