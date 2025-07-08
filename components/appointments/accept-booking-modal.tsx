import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AcceptBookingModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const AcceptBookingModal: React.FC<AcceptBookingModalProps> = ({
  visible,
  onClose,
  onConfirm,
  isLoading
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <SafeAreaView className="bg-white rounded-t-2xl p-6 max-h-[60%] mb-4">
          <Text className="text-lg font-bold mb-4 text-center">Accept Booking</Text>
          <Text className="text-base text-gray-700 mb-8 text-center">
            Are you sure you want to accept this booking?
          </Text>
          <View className="flex-row gap-4">
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg border border-gray-200 bg-gray-100"
              onPress={onClose}
              disabled={isLoading}
            >
              <Text className="text-center text-base text-gray-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-primary-300"
              onPress={onConfirm}
              disabled={isLoading}
            >
              <Text className="text-center text-base text-white font-semibold">
                {isLoading ? "Accepting..." : "Accept"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default AcceptBookingModal; 