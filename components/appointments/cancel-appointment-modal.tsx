import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CancelAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({ visible, onClose, onConfirm, isLoading }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <SafeAreaView className="bg-white rounded-t-2xl p-6">
          <Text className="text-lg font-bold mb-2 text-center">Cancel Appointment</Text>
          <Text className="text-base text-gray-700 mb-6 text-center">
            Are you sure you want to cancel this appointment?
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
              className="flex-1 py-3 rounded-lg bg-red-600"
              onPress={onConfirm}
              disabled={isLoading}
            >
              <Text className="text-center text-base text-white font-semibold">
                {isLoading ? "Cancelling..." : "Yes, cancel"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default CancelAppointmentModal; 