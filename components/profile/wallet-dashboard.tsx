import BottomSheetModal from '@/components/common/bottom-sheet-modal';
import useInitiatePayment from '@/hooks/mutation/useInitiatePayment';
import { useGetAccountBalance } from '@/hooks/query/useGetAccountBalance';
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import WalletCard from '../common/wallet-card';
import PaystackWebviewRobustModal from '../dashboard/PaystackWebviewRobustModal';
import TopUpModal from '../dashboard/TopUpModal';
import AddBankAccountModal from './AddBankAccountModal';

const WalletDashboard = () => {
  const { data: accountBalance, isPending } = useGetAccountBalance();
  const [withdrawalModalVisible, setWithdrawalModalVisible] = useState(false);
  const [addAccountModalVisible, setAddAccountModalVisible] = useState(false);
  const { handleInitiatePayment, isPending: isInitiatingPayment } = useInitiatePayment();
  const [amount, setAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [paystackUrl, setPaystackUrl] = useState<string | null>(null);
  const { data: userProfile } = useGetUserProfileDetails();

  // console.log('userProfile', userProfile)


  // const { user } = useAuthStore()
  // console.log('user', user)


  const balance = accountBalance?.data?.accountBalance ?? 0
  const currency = accountBalance?.data?.currency

  if (isPending) {
    return <ActivityIndicator className='flex-1 justify-center items-center' />
  }

  const handleAddFunds = async () => {
    if (!amount || isNaN(Number(amount))) return;
    const payload = {
      amount: Number(amount),
      beneficiaryName: userProfile?.data?.firstName + ' ' + userProfile?.data?.lastName,
      narration: 'Wallet Top Up',
      senderEmail: userProfile?.data?.emailAddress,
    };
    const response = await handleInitiatePayment(payload);
    const url = response?.data?.data?.authorization_url;
    if (url) {
      setModalVisible(false); // Close the amount modal
      setPaystackUrl(url);    // Open the Paystack modal
    }
  }

  const handleWithdrawFunds = () => {
    // TODO: Implement withdraw funds functionality
    console.log('Withdraw funds pressed')
  }

  const handleSeeAllWithdrawals = () => {
    setWithdrawalModalVisible(true)
  }

  const handleAddAccount = () => {
    setAddAccountModalVisible(true);
  }

  const handleRemoveAccount = (accountId: string) => {
    // TODO: Implement remove account functionality
    console.log('Remove account:', accountId)
  }

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      <WalletCard
        balance={balance}
        currency={currency}
        showChevron={false}
      />

      {/* Action Buttons */}
      <View className="flex-row px-4 mt-6 gap-3">
        <TouchableOpacity
          className="flex-1 bg-primary-300 rounded-lg py-4 flex-row items-center justify-center"
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={20} color="white" />
          <Text className="text-white font-rubikMedium ml-2">Add funds</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-gray-200 rounded-lg py-4 flex-row items-center justify-center"
          onPress={handleWithdrawFunds}
        >
          <Ionicons name="arrow-down-circle" size={20} color="#374151" />
          <Text className="text-gray-700 font-rubikMedium ml-2">Withdraw funds</Text>
        </TouchableOpacity>
      </View>

      {/* Withdrawal Activity */}
      <View className="px-4 mt-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-rubikMedium">Withdrawal activity:</Text>
          <TouchableOpacity onPress={handleSeeAllWithdrawals}>
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

      {/* Payout Accounts */}
      <View className="px-4 mt-8 mb-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-rubikMedium">Payout accounts:</Text>
          <TouchableOpacity onPress={handleAddAccount}>
            <Text className="text-primary-600 font-rubikMedium">Add account</Text>
          </TouchableOpacity>
        </View>

        {/* Bank Account */}
        <View className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="bg-blue-100 rounded-lg p-2 mr-3">
                <MaterialIcons name="account-balance" size={24} color="#1E40AF" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-rubikMedium">Ibrahim Babangida</Text>
                <Text className="text-sm text-gray-600">**** 1234</Text>
              </View>
            </View>
            <TouchableOpacity
              className="bg-red-500 rounded-full p-1"
              onPress={() => handleRemoveAccount('bank-1')}
            >
              <Ionicons name="close" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Visa Card */}
        <View className="bg-white border border-gray-200 rounded-lg p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="bg-blue-100 rounded-lg p-2 mr-3">
                <MaterialIcons name="credit-card" size={24} color="#1E40AF" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-rubikMedium">Ibrahim Babangida</Text>
                <Text className="text-sm text-gray-600">**** 1234</Text>
              </View>
            </View>
            <TouchableOpacity
              className="bg-red-500 rounded-full p-1"
              onPress={() => handleRemoveAccount('card-1')}
            >
              <Ionicons name="close" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Withdrawal History Modal */}
      <BottomSheetModal
        visible={withdrawalModalVisible}
        onClose={() => setWithdrawalModalVisible(false)}
        title="Withdrawal History"
      >
        <View className="space-y-4 pb-4">
          <Text className="text-center text-gray-600 mb-4">Recent withdrawal transactions</Text>

          {/* Sample withdrawal items */}
          <View className="bg-gray-50 rounded-lg p-4">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-base font-rubikMedium text-green-600">₦23,000.00</Text>
              <Text className="text-sm text-gray-600">24th Aug, 2024</Text>
            </View>
            <Text className="text-sm text-gray-600">Card : **** 2341</Text>
            <Text className="text-xs text-green-600 mt-1 font-rubikMedium">Completed</Text>
          </View>

          <View className="bg-gray-50 rounded-lg p-4">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-base font-rubikMedium text-green-600">₦15,500.00</Text>
              <Text className="text-sm text-gray-600">20th Aug, 2024</Text>
            </View>
            <Text className="text-sm text-gray-600">Bank : **** 5678</Text>
            <Text className="text-xs text-green-600 mt-1 font-rubikMedium">Completed</Text>
          </View>

          <View className="bg-gray-50 rounded-lg p-4">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-base font-rubikMedium text-green-600">₦8,750.00</Text>
              <Text className="text-sm text-gray-600">15th Aug, 2024</Text>
            </View>
            <Text className="text-sm text-gray-600">Card : **** 9012</Text>
            <Text className="text-xs text-green-600 mt-1 font-rubikMedium">Completed</Text>
          </View>

          <View className="bg-gray-50 rounded-lg p-4">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-base font-rubikMedium text-green-600">₦12,300.00</Text>
              <Text className="text-sm text-gray-600">10th Aug, 2024</Text>
            </View>
            <Text className="text-sm text-gray-600">Bank : **** 3456</Text>
            <Text className="text-xs text-green-600 mt-1 font-rubikMedium">Completed</Text>
          </View>

          <View className="bg-gray-50 rounded-lg p-4">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-base font-rubikMedium text-green-600">₦5,200.00</Text>
              <Text className="text-sm text-gray-600">5th Aug, 2024</Text>
            </View>
            <Text className="text-sm text-gray-600">Card : **** 7890</Text>
            <Text className="text-xs text-green-600 mt-1 font-rubikMedium">Completed</Text>
          </View>
        </View>
      </BottomSheetModal>

      <TopUpModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        amount={amount}
        setAmount={setAmount}
        onTopUp={handleAddFunds}
        isPending={isInitiatingPayment}
      />
      {/* Add Bank Account Modal */}
      <AddBankAccountModal
        visible={addAccountModalVisible}
        onClose={() => setAddAccountModalVisible(false)}
      />

      {paystackUrl && (
        <PaystackWebviewRobustModal
          visible={!!paystackUrl}
          onClose={() => setPaystackUrl(null)}
          paystackUrl={paystackUrl}
          backendDomain="https://api.eservone.com"
          paystackRedirectUrl="eservone://payment/thank-you"
          onComplete={url => {
            setPaystackUrl(null);
            // Extract reference from URL
            // const refMatch = url.match(/[?&]reference=([^&]+)/);
            // const reference = refMatch ? refMatch[1] : null;
            // setTransactionReference(reference || null);
            // setShowStatusModal(true);
          }}
        />
      )}
    </ScrollView>
  )
}

export default WalletDashboard