import React from "react";
import { KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AcceptBookingModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (amount: string) => void;
  isLoading?: boolean;
  amount: string;
  onAmountChange: (amount: string) => void;
}

const AcceptBookingModal: React.FC<AcceptBookingModalProps> = ({
  visible,
  onClose,
  onConfirm,
  isLoading,
  amount,
  onAmountChange
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View className="flex-1 justify-end bg-black/40">
          <SafeAreaView className="bg-white rounded-t-2xl p-6 max-h-[60%] mb-4">
            <Text className="text-lg font-bold mb-4 text-center">Accept Booking</Text>
            <Text className="text-base text-gray-700 mb-6 text-center">
              Are you sure you want to accept this booking?
            </Text>

            <View className="mb-6">
              <Text className="text-sm text-gray-600 mb-2">Agreed amount for service (₦)</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 text-base"
                placeholder="Enter agreed amount"
                value={amount}
                onChangeText={(text) => {
                  // Only allow numbers and decimal point
                  const numericText = text.replace(/[^0-9.]/g, '');
                  // Prevent multiple decimal points
                  const parts = numericText.split('.');
                  if (parts.length > 2) {
                    onAmountChange(parts[0] + '.' + parts.slice(1).join(''));
                  } else {
                    onAmountChange(numericText);
                  }
                }}
                keyboardType="numeric"
              />
            </View>

            <View className="flex-row gap-4">
              <TouchableOpacity
                className="flex-1 py-3 rounded-lg border border-gray-200 bg-gray-100"
                onPress={onClose}
                disabled={isLoading}
              >
                <Text className="text-center text-base text-gray-700 font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 rounded-lg ${isLoading || !amount.trim()
                  ? 'bg-gray-300'
                  : 'bg-primary-300'
                  }`}
                onPress={() => onConfirm(amount)}
                disabled={isLoading || !amount.trim()}
              >
                <Text className={`text-center text-base font-semibold ${isLoading || !amount.trim()
                  ? 'text-gray-500'
                  : 'text-white'
                  }`}>
                  {isLoading ? "Accepting..." : "Accept"}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AcceptBookingModal; 