import { Appointment } from "@/constants/types";
import React from "react";
import { Text, View } from "react-native";

interface AppointmentStatusIndicatorProps {
  appointment: Appointment;
}

const AppointmentStatusIndicator: React.FC<AppointmentStatusIndicatorProps> = ({ appointment }) => {
  const isAppointmentPending = appointment.serviceStatus === 'PENDING';
  const isCompleted = appointment.serviceStatus === 'COMPLETED';

  return (
    <View className="bg-gray-50 p-4 rounded-lg mb-6">
      <Text className="text-gray-400 text-xs mb-1">Status:</Text>
      <View className="flex-row items-center">
        <View className={`w-3 h-3 rounded-full mr-2 ${isAppointmentPending ? 'bg-yellow-500' :
          isCompleted ? 'bg-green-500' :
            'bg-red-500'
          }`} />
        <Text className={`text-base font-semibold ${isAppointmentPending ? 'text-yellow-700' :
          isCompleted ? 'text-green-700' :
            'text-red-700'
          }`}>
          {appointment.serviceStatus}
        </Text>
      </View>
    </View>
  );
};

export default AppointmentStatusIndicator; 