import { useGetTransactionHistory } from '@/hooks/query/useGetTransactionHistory';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface WithdrawalActivityProps {
  currency: string;
  balance: number;
  onSeeAllWithdrawals: () => void;
}

interface Transaction {
  amount: number;
  type: string;
  service: string;
  date: string;
}

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const WithdrawalActivity: React.FC<WithdrawalActivityProps> = ({
  currency,
  balance,
  onSeeAllWithdrawals
}) => {
  const { data: transactionHistory } = useGetTransactionHistory();



  // Map API transaction data to UI format and filter for withdrawals (Debit transactions)
  const mappedTransactions = Array.isArray(transactionHistory?.data)
    ? transactionHistory.data
      .filter((tx: any) => tx.transType === 'D') // Only debit/withdrawal transactions
      .map((tx: any) => ({
        amount: tx.amount,
        type: 'Withdrawal',
        service: tx.description,
        date: tx.transactionDate,
      }))
    : [];

  // Get first 4 transactions for display
  const recentTransactions = mappedTransactions.slice(0, 4);
  const hasMoreTransactions = mappedTransactions.length > 4;

  return (
    <View className="px-4 mt-8">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-rubikMedium">Withdrawal activity:</Text>
        {hasMoreTransactions && (
          <TouchableOpacity onPress={onSeeAllWithdrawals}>
            <Text className="text-primary-600 font-rubikMedium">See all</Text>
          </TouchableOpacity>
        )}
      </View>

      {recentTransactions.length === 0 ? (
        <View className="bg-gray-50 rounded-lg p-4">
          <Text className="text-sm text-gray-600 mb-2">No withdrawal history</Text>
          <Text className="text-base font-rubikMedium mb-1">No withdrawals yet</Text>
          <Text className="text-sm text-gray-600">Start withdrawing to see your history</Text>
        </View>
      ) : (
        <View className="space-y-3">
          {recentTransactions.map((transaction: Transaction, index: number) => (
            <View key={index} className="bg-gray-50 rounded-lg p-4">
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-base font-rubikMedium text-red-600">
                  -{currency} {transaction.amount.toLocaleString()}
                </Text>
                <Text className="text-sm text-gray-600">{formatDate(transaction.date)}</Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="account-balance" size={16} color="#A3A3A3" />
                <Text className="text-sm text-gray-600 ml-2">{transaction.service}</Text>
              </View>
              <Text className="text-xs text-green-600 mt-1 font-rubikMedium">Completed</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default WithdrawalActivity; 