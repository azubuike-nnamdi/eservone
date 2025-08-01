import WalletCard from '@/components/common/wallet-card';
import { useCurrency } from '@/context/currency-context';
import { useGetAccountBalance } from '@/hooks/query/useGetAccountBalance';
import { useGetTransactionHistory } from '@/hooks/query/useGetTransactionHistory';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function EarningsDashboard() {
  const { symbol } = useCurrency();
  const { data: accountBalance, isPending } = useGetAccountBalance();
  const { data: transactionHistory, isPending: isTransactionHistoryPending } = useGetTransactionHistory();

  const balance = accountBalance?.data?.accountBalance ?? 0
  const currency = accountBalance?.data?.currency

  if (isPending || isTransactionHistoryPending) {
    return <ActivityIndicator className='flex-1 justify-center items-center' />
  }

  // Map API transaction data to UI format
  const mappedTransactions = Array.isArray(transactionHistory?.data)
    ? transactionHistory.data.map((tx: any) => ({
      amount: tx.amount,
      type: tx.transType === 'C' ? 'Credit' : 'Debit',
      service: tx.description,
      date: tx.transactionDate,
    }))
    : [];

  return (
    <View className="flex-1 bg-white">
      {/* Wallet Card */}
      <WalletCard
        balance={balance}
        currency={currency}
        showChevron={true}
      />

      {/* Earnings History */}
      <View className="px-4 mt-6 flex-1">
        <Text className="font-bold text-base mb-3">Earnings history:</Text>
        {mappedTransactions.length === 0 ? (
          <Text className="text-gray-400 text-center mt-8">No transactions found.</Text>
        ) : (
          <FlatList
            data={mappedTransactions}
            keyExtractor={(_, idx) => idx.toString()}
            ItemSeparatorComponent={() => <View className="h-px bg-gray-200 my-2" />}
            renderItem={({ item }) => {
              const isCredit = item.type === 'Credit';
              const textColor = isCredit ? 'text-green-600' : 'text-red-600';

              return (
                <View className="mb-2">
                  <View className="flex-row justify-between items-center">
                    <Text className={`font-bold text-base ${textColor}`}>
                      {symbol}{item.amount.toLocaleString()} <Text className={`font-normal text-sm ${textColor}`}>- [ {item.type} ]</Text>
                    </Text>
                    <Text className={`text-xs ${textColor}`}>{formatDate(item.date)}</Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <MaterialIcons name="work" size={16} color="#A3A3A3" />
                    <Text className="text-gray-500 text-sm ml-2">{item.service}</Text>
                  </View>
                </View>
              );
            }}
            ListFooterComponent={<View style={{ height: 24 }} />}
          />
        )}
      </View>
    </View>
  )
} 