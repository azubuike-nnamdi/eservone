import { useCurrency } from '@/context/currency-context';
import { useGetAccountBalance } from '@/hooks/query/useGetAccountBalance';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

interface Transaction {
  amount: number;
  type: string;
  service: string;
  user: string;
  date: string;
}

const walletBalance = 23000;
// const lastPaymentDate = '2024-08-24';

const transactions: Transaction[] = [
  { amount: 5000, type: 'Initial payment', service: 'Wig installation', user: 'John Doe', date: '2049-01-24' },
  { amount: 50000, type: 'Balance', service: 'Wig installation', user: 'John Doe', date: '2049-01-24' },
  { amount: 50000, type: 'Balance', service: 'Wig installation', user: 'John Doe', date: '2049-01-24' },
  { amount: 50000, type: 'Balance', service: 'Wig installation', user: 'John Doe', date: '2049-01-24' },
];

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function EarningsDashboard() {
  const { symbol } = useCurrency();
  const { data: accountBalance, isPending } = useGetAccountBalance();

  console.log('accountBalance', accountBalance)

  if (isPending) {
    return <ActivityIndicator className='flex-1 justify-center items-center' />
  }
  return (
    <View className="flex-1 bg-white">
      {/* Wallet Card */}
      <View className="bg-[#ECECF5] mx-3 rounded-lg mt-4">
        <View className="bg-primary-50 rounded-xl p-4 shadow-sm relative">
          <Text className="text-sm text-primary-900 mb-1"> Wallet Balance:</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-primary-900">{symbol}{walletBalance.toLocaleString()}</Text>
            <Ionicons name="chevron-forward" size={24} color="#7C6AED" />
          </View>
          <Text className="text-xs text-primary-300 mt-2 ">Last payment received: <Text className="font-semibold text-primary-600">24th Aug, 2024</Text></Text>
        </View>
      </View>

      {/* Earnings History */}
      <View className="px-4 mt-6 flex-1">
        <Text className="font-bold text-base mb-3">Earnings history:</Text>
        <FlatList
          data={transactions}
          keyExtractor={(_, idx) => idx.toString()}
          ItemSeparatorComponent={() => <View className="h-px bg-gray-200 my-2" />}
          renderItem={({ item }) => (
            <View className="mb-2">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-black text-base">
                  {symbol}{item.amount.toLocaleString()} <Text className="font-normal text-gray-400 text-sm">- [ {item.type} ]</Text>
                </Text>
                <Text className="text-gray-400 text-xs">{formatDate(item.date)}</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <MaterialIcons name="work" size={16} color="#A3A3A3" />
                <Text className="text-gray-500 text-sm ml-2">{item.service}</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Ionicons name="person" size={16} color="#A3A3A3" />
                <Text className="text-gray-500 text-sm ml-2">{item.user}</Text>
              </View>
            </View>
          )}
          ListFooterComponent={<View style={{ height: 24 }} />}
        />
      </View>
    </View>
  )
} 