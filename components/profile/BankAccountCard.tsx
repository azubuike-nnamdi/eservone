import { BankAccountCardProps } from '@/constants/types';
import { getBankName, maskAccountNumber } from '@/lib/bank-helper';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const BankAccountCard: React.FC<BankAccountCardProps> = ({ account, onViewDetails }) => {


  return (
    <View className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center flex-1">
          <View className="bg-blue-100 rounded-lg p-2 mr-3">
            <MaterialIcons name="credit-card" size={24} color="#1E40AF" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-rubikMedium text-gray-900">
              {account.nickName}
            </Text>
            <Text className="text-sm text-gray-600">
              {getBankName(account.bankCode)}
            </Text>
            <Text className="text-xs text-gray-500">
              {maskAccountNumber(account.accountNumber)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-primary-600 rounded-lg px-3 "
          onPress={() => onViewDetails(account)}
        >
          <Text className="text-black text-sm font-rubikMedium">View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BankAccountCard; 