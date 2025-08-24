import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Button from "../common/button";

interface CompletionModalProps {
  visible: boolean;
  completionType: 'seeker' | 'provider' | null;
  isCompleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  visible,
  completionType,
  isCompleting,
  onConfirm,
  onClose
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6 max-h-96">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Confirm Service Completion</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Confirmation Message */}
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="checkmark-circle" size={32} color="#3B82F6" />
            </View>
            <Text className="text-lg font-medium text-center mb-2">
              Mark Service as Completed?
            </Text>
            <Text className="text-gray-600 text-center text-sm">
              {completionType === 'seeker'
                ? 'Are you sure you want to mark your part of the service as completed? This action cannot be undone.'
                : 'Are you sure you want to mark your part of the service as completed? This action cannot be undone.'
              }
            </Text>

          </View>

          {/* Action Buttons */}
          <View className="space-y-3">
            <Button
              onPress={onConfirm}
              className="w-full"
              disabled={isCompleting}
              loading={isCompleting}
              loadingText="Marking as completed..."
            >
              <Text className="text-center text-white font-semibold text-lg">
                Confirm Completion
              </Text>
            </Button>
            <Button
              onPress={onClose}
              variant="secondary"
              className="w-full"
              disabled={isCompleting}
            >
              <Text className="text-center text-gray-700 font-semibold text-lg mb-6">
                Cancel
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CompletionModal;
