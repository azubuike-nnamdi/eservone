import React from 'react';
import { Modal, Text, View } from 'react-native';
import Button from '../common/button';

interface DeclineAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeclineAppointmentModal: React.FC<DeclineAppointmentModalProps> = ({
  visible,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6 w-full">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Decline Appointment
          </Text>
          <Text className="text-gray-600 mb-6">
            Are you sure you want to decline this appointment? This action cannot be undone.
          </Text>

          <View className="flex-row space-x-7 gap-5 mb-12 mt-4">
            <Button
              className="flex-1 bg-gray-200 py-3 rounded-lg"
              onPress={onClose}
              disabled={isLoading}
            >
              <Text className="text-center text-gray-700 font-medium">
                Cancel
              </Text>
            </Button>

            <Button
              className="flex-1 bg-red-600 py-3 rounded-lg"
              onPress={onConfirm}
              disabled={isLoading}
              loading={isLoading}
              loadingText="Declining..."
            >
              <Text className="text-center text-white font-medium">
                Decline
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeclineAppointmentModal;
