import { getBankName, maskAccountNumber } from '@/lib/bank-helper';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomSheetModal from '../common/bottom-sheet-modal';
import Button from '../common/button';
import KeyboardAwareScrollView from '../common/keyboard-aware-scroll-view';

interface BankAccount {
  id: number;
  accountNumber: string;
  bankCode: string;
  emailAddress: string;
  nickName: string;
  newNickname?: string | null;
}

interface WithdrawModalProps {
  visible: boolean;
  onClose: () => void;
  amount: string;
  setAmount: (amount: string) => void;
  error: string;
  balance: number;
  currency: string;
  selectedAccount: BankAccount | null;
  onSubmit: () => void;
  isPending?: boolean;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  visible,
  onClose,
  amount,
  setAmount,
  error,
  balance,
  currency,
  selectedAccount,
  onSubmit,
  isPending = false,
}) => {
  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      title="Withdraw Funds"
    >
      <KeyboardAwareScrollView className="flex-1" keyboardVerticalOffset={100}>
        <View className="space-y-6 pb-6">
          {/* Balance Display */}
          <View className="bg-gray-50 rounded-lg p-4">
            <Text className="text-sm text-gray-600 mb-1">Available Balance</Text>
            <Text className="text-2xl font-rubikBold text-primary-600">
              {currency} {balance.toLocaleString()}
            </Text>
          </View>

          {/* Selected Bank Account */}
          {selectedAccount && (
            <View className="bg-gray-50 rounded-lg p-4">
              <Text className="text-sm text-gray-600 mb-2">Withdraw to:</Text>
              <View className="flex-row items-center">
                <View className="bg-primary-100 rounded-full p-2 mr-3">
                  <Ionicons name="card" size={20} color="#1F2937" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-rubikMedium text-gray-900">
                    {selectedAccount.nickName}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {getBankName(selectedAccount.bankCode)}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {maskAccountNumber(selectedAccount.accountNumber)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Amount Input */}
          <View>
            <Text className="text-base font-rubikMedium text-gray-900 mb-2">
              Amount to withdraw
            </Text>
            <View className="relative">
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-lg font-rubikMedium"
                placeholder="Enter amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                autoFocus
              />
              <View className="absolute right-3 top-3">
                <Text className="text-gray-500 font-rubikMedium">{currency}</Text>
              </View>
            </View>
            {error ? (
              <Text className="text-red-500 text-sm mt-2">{error}</Text>
            ) : (
              <Text className="text-gray-500 text-sm mt-2">
                Maximum: {currency} {balance.toLocaleString()}
              </Text>
            )}
          </View>

          {/* Quick Amount Buttons */}
          <View>
            <Text className="text-sm text-gray-600 mb-3">Quick amounts:</Text>
            <View className="flex-row flex-wrap gap-2">
              {[1000, 2000, 5000, 10000].map((quickAmount) => (
                <TouchableOpacity
                  key={quickAmount}
                  className={`px-4 py-2 rounded-lg border ${amount === quickAmount.toString()
                    ? 'bg-primary-300 border-primary-300'
                    : 'bg-white border-gray-300'
                    }`}
                  onPress={() => setAmount(quickAmount.toString())}
                >
                  <Text
                    className={`text-sm font-rubikMedium ${amount === quickAmount.toString()
                      ? 'text-white'
                      : 'text-gray-700'
                      }`}
                  >
                    {currency} {quickAmount.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <Button
            onPress={onSubmit}
            disabled={!amount || Number(amount) <= 0 || Number(amount) > balance}
            loading={isPending}
            loadingText="Processing..."
            className="mt-6"
          >
            <View className="flex-row items-center">
              <Ionicons name="arrow-down-circle" size={20} color="white" />
              <Text className="text-white font-rubikMedium ml-2">
                Withdraw {currency} {Number(amount) || 0}
              </Text>
            </View>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </BottomSheetModal>
  );
};

export default WithdrawModal; 