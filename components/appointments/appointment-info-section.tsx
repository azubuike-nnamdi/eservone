import { Appointment } from "@/constants/types";
import { formatDate, formatTime } from "@/lib/helper";
import React from "react";
import { Text, View } from "react-native";

interface AppointmentInfoSectionProps {
  appointment: Appointment;
}

const AppointmentInfoSection: React.FC<AppointmentInfoSectionProps> = ({ appointment }) => {
  return (
    <>
      {/* Two-column info grid */}
      <View className="flex-row justify-between mb-4">
        <View style={{ flex: 1 }}>
          <Text className="text-gray-400 text-xs mb-1">Date:</Text>
          <Text className="text-lg font-bold mb-2">{formatDate(appointment.appointmentDate)}</Text>
          <Text className="text-gray-400 text-xs mb-1">Service type:</Text>
          <Text className="text-base text-black mb-2">Home service</Text>
          <Text className="text-gray-400 text-xs mb-1">Customer address:</Text>
          <Text className="text-base text-black mb-2">{appointment.address || 'N/A'}</Text>
          <Text className="text-gray-400 text-xs mb-1">Buzz code:</Text>
          <Text className="text-base text-black mb-2">{appointment.buzzCode}</Text>
          <Text className="text-gray-400 text-xs mb-1">Upfront payment (%):</Text>
          <Text className="text-base text-black mb-2">{appointment.upfrontPayment}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 24 }}>
          <Text className="text-gray-400 text-xs mb-1">Time:</Text>
          <Text className="text-lg font-bold mb-2">{formatTime(appointment.appointmentDate)}</Text>
          <Text className="text-gray-400 text-xs mb-1">Pets:</Text>
          <Text className="text-base text-black mb-2">{appointment.hasPet ? 'Yes' : 'No'}</Text>
          <Text className="text-gray-400 text-xs mb-1">Cost:</Text>
          <Text className="text-base text-black mb-2">{appointment.costOfService}</Text>
        </View>
      </View>

      {/* Additional info */}
      <Text className="text-gray-400 text-xs mb-1">Additional information:</Text>
      <Text className="text-base text-black mb-6">
        {appointment.additionalDetails || 'N/A'}
      </Text>
    </>
  );
};

export default AppointmentInfoSection; 