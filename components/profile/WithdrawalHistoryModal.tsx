import { useGetTransactionHistory } from '@/hooks/query/useGetTransactionHistory';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import BottomSheetModal from '../common/bottom-sheet-modal';

interface WithdrawalHistoryModalProps {
  visible: boolean;
  onClose: () => void;
  currency: string;
}

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const WithdrawalHistoryModal: React.FC<WithdrawalHistoryModalProps> = ({
  visible,
  onClose,
  currency
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

  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      title="Withdrawal History"
    >
      <View className="space-y-4 pb-4">
        <Text className="text-center text-gray-600 mb-4">All withdrawal transactions</Text>

        {mappedTransactions.length === 0 ? (
          <View className="bg-gray-50 rounded-lg p-6">
            <Text className="text-center text-gray-500">No withdrawal history found</Text>
          </View>
        ) : (
          mappedTransactions.map((transaction: any, index: number) => (
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
          ))
        )}
      </View>
    </BottomSheetModal>
  );
};

export default WithdrawalHistoryModal; 