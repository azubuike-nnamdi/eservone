import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import BankAccountCard from './BankAccountCard';

interface BankAccount {
  id: number;
  accountNumber: string;
  bankCode: string;
  emailAddress: string;
  nickName: string;
  newNickname?: string | null;
}

interface BankAccountsSectionProps {
  beneficiariesData: BankAccount[];
  onAddAccount: () => void;
  onViewAccountDetails: (account: BankAccount) => void;
}

const BankAccountsSection: React.FC<BankAccountsSectionProps> = ({
  beneficiariesData,
  onAddAccount,
  onViewAccountDetails
}) => {
  return (
    <View className="px-4 mt-8 mb-8">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-rubikMedium">Payout accounts:</Text>
        <TouchableOpacity onPress={onAddAccount}>
          <Text className="text-primary-600 font-rubikMedium">Add account</Text>
        </TouchableOpacity>
      </View>

      {/* Bank Accounts List */}
      {beneficiariesData.length > 0 ? (
        <FlatList
          data={beneficiariesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BankAccountCard
              account={item}
              onViewDetails={onViewAccountDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      ) : (
        <View className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-3">
          <View className="items-center">
            <MaterialIcons name="account-balance" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 font-rubikMedium mt-2 text-center">
              No bank accounts added yet
            </Text>
            <Text className="text-gray-400 text-sm mt-1 text-center">
              Add your first bank account to start receiving payments
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default BankAccountsSection; 