import { ValidateAccountPayload } from '@/constants/types';
import useValidateAccount from '@/hooks/mutation/useValidateAccount';
import { useGetBanks } from '@/hooks/query/useGetBanks';
import { useAuthStore } from '@/store/auth-store';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddBankAccountModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Bank {
  id: number;
  bankName: string;
  bankCode: string;
  status: boolean;
}

const AddBankAccountModal: React.FC<AddBankAccountModalProps> = ({ visible, onClose }) => {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: banksData, isPending: isLoadingBanks } = useGetBanks();
  const { handleValidateAccount, isPending: isSubmitting } = useValidateAccount();
  const { user } = useAuthStore();

  const banks = banksData?.data || [];

  // Filter banks based on search query
  const filteredBanks = banks.filter((bank: Bank) =>
    bank.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset form when modal opens
  useEffect(() => {
    if (visible) {
      setSelectedBank(null);
      setAccountNumber('');
      setAccountName('');
      setSearchQuery('');
      setShowBankDropdown(false);
    }
  }, [visible]);

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setShowBankDropdown(false);
    setSearchQuery('');
  };

  const handleSubmit = () => {
    if (!selectedBank || !accountNumber || !user?.email) {
      return;
    }

    const payload: ValidateAccountPayload = {
      accountNumber,
      bankCode: selectedBank.bankCode,
      emailAddress: user.email,
    };

    handleValidateAccount(payload);
  };

  // Update account name when account number is entered (simulate validation)
  useEffect(() => {
    if (accountNumber.length >= 10 && selectedBank) {
      setAccountName("Account validation in progress...");
    } else {
      setAccountName("");
    }
  }, [accountNumber, selectedBank]);

  const isFormValid = selectedBank && accountNumber.length >= 10;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6 max-h-[80%] overflow-hidden mb-8">
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-xl font-rubikMedium">Add Bank Account</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Bank Selection */}
            <View className="mb-4 relative">
              <Text className="text-sm font-rubikMedium text-gray-700 mb-2">Select Bank</Text>
              <TouchableOpacity
                className="border border-gray-300 rounded-lg p-4 flex-row items-center justify-between"
                onPress={() => setShowBankDropdown(!showBankDropdown)}
              >
                <Text className={selectedBank ? "text-gray-900" : "text-gray-500"}>
                  {selectedBank ? selectedBank.bankName : "Select a bank"}
                </Text>
                <Ionicons
                  name={showBankDropdown ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#374151"
                />
              </TouchableOpacity>

              {/* Bank Dropdown */}
              {showBankDropdown && (
                <View className="absolute top-full left-0 right-0 border border-gray-300 rounded-lg mt-1 max-h-[200px] bg-white z-10 shadow-lg overflow-hidden">
                  {/* Search Input */}
                  <View className="p-2 border-b border-gray-200">
                    <TextInput
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      placeholder="Search banks..."
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                  </View>

                  {/* Bank List */}
                  <ScrollView className="max-h-[160px]">
                    {isLoadingBanks ? (
                      <View className="p-3 items-center">
                        <ActivityIndicator size="small" color="#1E40AF" />
                        <Text className="text-sm text-gray-600 mt-1">Loading banks...</Text>
                      </View>
                    ) : (
                      filteredBanks.map((bank: Bank, index: number) => (
                        <TouchableOpacity
                          key={bank.bankCode}
                          className="p-2 border-b border-gray-100"
                          onPress={() => handleBankSelect(bank)}
                        >
                          <Text className="text-sm text-gray-900">{bank.bankName}</Text>
                        </TouchableOpacity>
                      ))
                    )}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Account Number */}
            <View className="mb-4">
              <Text className="text-sm font-rubikMedium text-gray-700 mb-2">Account Number</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-4 text-base"
                placeholder="Enter account number"
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>

            {/* Account Name (Read-only) */}
            <View className="mb-6">
              <Text className="text-sm font-rubikMedium text-gray-700 mb-2">Account Name</Text>
              <View className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <Text className={`text-base ${accountName ? "text-gray-900" : "text-gray-500"}`}>
                  {accountName || "Account name will appear here after validation"}
                </Text>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className={`rounded-lg py-4 items-center ${isFormValid ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              onPress={handleSubmit}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-rubikMedium text-base">
                  Add Account
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddBankAccountModal; 