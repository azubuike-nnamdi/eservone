import icons from "@/constants/icons";
import { Appointment } from "@/constants/types";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CompletionActionsProps {
  appointment: Appointment;
  isSeeker: boolean;
  isProvider: boolean;
  isCompleting: boolean;
  onMarkCompleted: () => void;
}

const CompletionActions: React.FC<CompletionActionsProps> = ({
  appointment,
  isSeeker,
  isProvider,
  isCompleting,
  onMarkCompleted
}) => {
  return (
    <>
      {/* Mark as completed for providers when appointment is ACCEPTED */}
      {isProvider &&
        appointment.serviceAppointmentStatus === 'ACCEPT' &&
        appointment.providerServiceStatus === 'PENDING' &&
        appointment.paymentStatus !== 'FINALIZED' && (
          <View className="bg-white mb-6">
            <TouchableOpacity
              className="flex-row items-center gap-4 py-4 border-b border-gray-200"
              onPress={onMarkCompleted}
              disabled={isCompleting}
            >
              <Image source={icons.markCompletedIcon} className="w-5 h-5" />
              <Text className="text-base text-black">
                {isCompleting ? 'Marking as completed...' : 'Mark service as completed'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

      {/* Mark as completed for seekers when appointment is ACCEPTED */}
      {isSeeker &&
        appointment.serviceAppointmentStatus === 'ACCEPT' &&
        appointment.seekerServiceStatus === 'PENDING' &&
        appointment.paymentStatus === 'SUCCESSFUL' && (
          <View className="bg-white mb-6">
            <TouchableOpacity
              className="flex-row items-center gap-4 py-4 border-b border-gray-200"
              onPress={onMarkCompleted}
              disabled={isCompleting}
            >
              <Image source={icons.markCompletedIcon} className="w-5 h-5" />
              <Text className="text-base text-black">
                {isCompleting ? 'Marking as completed...' : 'Mark service as completed'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
    </>
  );
};

export default CompletionActions;
