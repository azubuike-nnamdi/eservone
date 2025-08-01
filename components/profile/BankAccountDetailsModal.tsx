import { getBankName } from '@/lib/bank-helper';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface BankAccount {
  id: number;
  accountNumber: string;
  bankCode: string;
  emailAddress: string;
  nickName: string;
  newNickname?: string | null;
}

interface BankAccountDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  account: BankAccount | null;
}

const BankAccountDetailsModal: React.FC<BankAccountDetailsModalProps> = ({
  visible,
  onClose,
  account
}) => {
  if (!account) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl max-h-[80%] overflow-hidden">
          {/* Header */}
          <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
            <Text className="text-xl font-rubikMedium">Account Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
            <View className="space-y-6">
              {/* Account Name */}
              <View>
                <Text className="text-sm font-rubikMedium text-gray-600 mb-2">Account Name</Text>
                <View className="bg-gray-50 rounded-lg p-4">
                  <Text className="text-base font-rubikMedium text-gray-900">
                    {account.nickName}
                  </Text>
                </View>
              </View>

              {/* Bank Name */}
              <View>
                <Text className="text-sm font-rubikMedium text-gray-600 mb-2">Bank</Text>
                <View className="bg-gray-50 rounded-lg p-4">
                  <Text className="text-base font-rubikMedium text-gray-900">
                    {getBankName(account.bankCode)}
                  </Text>
                </View>
              </View>

              {/* Account Number */}
              <View>
                <Text className="text-sm font-rubikMedium text-gray-600 mb-2">Account Number</Text>
                <View className="bg-gray-50 rounded-lg p-4">
                  <Text className="text-base font-rubikMedium text-gray-900">
                    {account.accountNumber}
                  </Text>
                </View>
              </View>

              {/* Email Address */}
              <View>
                <Text className="text-sm font-rubikMedium text-gray-600 mb-2">Email Address</Text>
                <View className="bg-gray-50 rounded-lg p-4">
                  <Text className="text-base font-rubikMedium text-gray-900">
                    {account.emailAddress}
                  </Text>
                </View>
              </View>

              {/* Account ID */}
              <View>
                <Text className="text-sm font-rubikMedium text-gray-600 mb-2">Account ID</Text>
                <View className="bg-gray-50 rounded-lg p-4">
                  <Text className="text-base font-rubikMedium text-gray-900">
                    {account.id}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default BankAccountDetailsModal; 