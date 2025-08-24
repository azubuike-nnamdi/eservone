import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface PaymentStatusModalProps {
  visible: boolean;
  onClose: () => void;
}

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-3xl p-6">
          {/* Handle bar */}
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

          {/* Content */}
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
              <Text className="text-3xl">✓</Text>
            </View>

            <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Payment Initiated
            </Text>

            <Text className="text-base text-gray-600 text-center leading-6">
              Your payment has been initiated successfully. Please check your wallet for updates.
            </Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            onPress={onClose}
            className="bg-primary-300 py-4 rounded-xl mb-8"
          >
            <Text className="text-white text-center font-bold text-lg">
              Got it
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentStatusModal;
