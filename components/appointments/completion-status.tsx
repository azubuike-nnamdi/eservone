import { Appointment } from "@/constants/types";
import React from "react";
import { Text, View } from "react-native";

interface CompletionStatusProps {
  appointment: Appointment;
}

const CompletionStatus: React.FC<CompletionStatusProps> = ({ appointment }) => {
  return (
    <View className="bg-blue-50 p-4 rounded-lg mb-6">
      <Text className="text-blue-800 font-semibold mb-2">Service Completion Status</Text>
      <View className="space-y-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-blue-700">Seeker:</Text>
          <View className={`px-3 py-1 rounded-full ${appointment.seekerServiceStatus === 'COMPLETED' ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <Text className={`text-sm font-medium ${appointment.seekerServiceStatus === 'COMPLETED' ? 'text-green-700' : 'text-yellow-700'}`}>
              {appointment.seekerServiceStatus === 'COMPLETED' ? 'Completed' : 'Pending'}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-blue-700">Provider:</Text>
          <View className={`px-3 py-1 rounded-full ${appointment.providerServiceStatus === 'COMPLETED' ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <Text className={`text-sm font-medium ${appointment.providerServiceStatus === 'COMPLETED' ? 'text-green-700' : 'text-yellow-700'}`}>
              {appointment.providerServiceStatus === 'COMPLETED' ? 'Completed' : 'Pending'}
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-blue-600 text-sm mt-2 text-center">
        Both parties must complete before service is finished
      </Text>
    </View>
  );
};

export default CompletionStatus;
