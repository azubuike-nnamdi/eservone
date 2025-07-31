import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface WalletActionButtonsProps {
  onAddFunds: () => void;
  onWithdrawFunds: () => void;
}

const WalletActionButtons: React.FC<WalletActionButtonsProps> = ({
  onAddFunds,
  onWithdrawFunds
}) => {
  return (
    <View className="flex-row px-4 mt-6 gap-3">
      <TouchableOpacity
        className="flex-1 bg-primary-300 rounded-lg py-4 flex-row items-center justify-center"
        onPress={onAddFunds}
      >
        <Ionicons name="add-circle" size={20} color="white" />
        <Text className="text-white font-rubikMedium ml-2">Add funds</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 bg-gray-200 rounded-lg py-4 flex-row items-center justify-center"
        onPress={onWithdrawFunds}
      >
        <Ionicons name="arrow-down-circle" size={20} color="#374151" />
        <Text className="text-gray-700 font-rubikMedium ml-2">Withdraw funds</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalletActionButtons; 