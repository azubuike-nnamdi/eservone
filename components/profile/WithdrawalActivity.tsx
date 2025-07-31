import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface WithdrawalActivityProps {
  currency: string;
  balance: number;
  onSeeAllWithdrawals: () => void;
}

const WithdrawalActivity: React.FC<WithdrawalActivityProps> = ({
  currency,
  balance,
  onSeeAllWithdrawals
}) => {
  // const { data } = useGetTransactionHistory();

  return (
    <View className="px-4 mt-8">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-rubikMedium">Withdrawal activity:</Text>
        <TouchableOpacity onPress={onSeeAllWithdrawals}>
          <Text className="text-primary-600 font-rubikMedium">See all</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-gray-50 rounded-lg p-4">
        <Text className="text-sm text-gray-600 mb-2">Last withdrawal:</Text>
        <Text className="text-base font-rubikMedium mb-1">24th Aug, 2024</Text>
        <Text className="text-sm text-gray-600">Card : **** 2341</Text>
        <View className="flex-row justify-end mt-2">
          <Text className="text-lg font-rubikMedium text-primary-600">{currency} {balance}</Text>
        </View>
      </View>
    </View>
  );
};

export default WithdrawalActivity; 