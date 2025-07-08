import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CompleteAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const CompleteAppointmentModal: React.FC<CompleteAppointmentModalProps> = ({ visible, onClose, onConfirm, isLoading }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <SafeAreaView className="bg-white rounded-t-2xl p-6 mb-4">
          <Text className="text-lg font-bold mb-2 text-center">Complete Appointment</Text>
          <Text className="text-base text-gray-700 mb-6 text-center">
            Are you sure you want to mark this appointment as completed?
          </Text>
          <View className="flex-row gap-4">
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg border border-gray-200 bg-gray-100"
              onPress={onClose}
              disabled={isLoading}
            >
              <Text className="text-center text-base text-gray-700 font-semibold">No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-green-600"
              onPress={onConfirm}
              disabled={isLoading}
            >
              <Text className="text-center text-base text-white font-semibold">
                {isLoading ? "Completing..." : "Yes, complete"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default CompleteAppointmentModal; 