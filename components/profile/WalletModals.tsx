import BottomSheetModal from '@/components/common/bottom-sheet-modal';
import PaystackWebviewRobustModal from '@/components/dashboard/PaystackWebviewRobustModal';
import TopUpModal from '@/components/dashboard/TopUpModal';
import React from 'react';
import { Text, View } from 'react-native';
import AddBankAccountModal from './AddBankAccountModal';
import BankAccountDetailsModal from './BankAccountDetailsModal';

interface BankAccount {
  id: number;
  accountNumber: string;
  bankCode: string;
  emailAddress: string;
  nickName: string;
  newNickname?: string | null;
}

interface WalletModalsProps {
  // Top Up Modal
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  amount: string;
  setAmount: (amount: string) => void;
  onTopUp: () => void;
  isInitiatingPayment: boolean;

  // Add Account Modal
  addAccountModalVisible: boolean;
  setAddAccountModalVisible: (visible: boolean) => void;

  // Details Modal
  detailsModalVisible: boolean;
  setDetailsModalVisible: (visible: boolean) => void;
  selectedAccount: BankAccount | null;
  setSelectedAccount: (account: BankAccount | null) => void;

  // Withdrawal Modal
  withdrawalModalVisible: boolean;
  setWithdrawalModalVisible: (visible: boolean) => void;

  // Paystack Modal
  paystackUrl: string | null;
  setPaystackUrl: (url: string | null) => void;
}

const WalletModals: React.FC<WalletModalsProps> = ({
  modalVisible,
  setModalVisible,
  amount,
  setAmount,
  onTopUp,
  isInitiatingPayment,
  addAccountModalVisible,
  setAddAccountModalVisible,
  detailsModalVisible,
  setDetailsModalVisible,
  selectedAccount,
  setSelectedAccount,
  withdrawalModalVisible,
  setWithdrawalModalVisible,
  paystackUrl,
  setPaystackUrl
}) => {
  return (
    <>
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
        onTopUp={onTopUp}
        isPending={isInitiatingPayment}
      />

      <AddBankAccountModal
        visible={addAccountModalVisible}
        onClose={() => setAddAccountModalVisible(false)}
      />

      <BankAccountDetailsModal
        visible={detailsModalVisible}
        onClose={() => {
          setDetailsModalVisible(false);
          setSelectedAccount(null);
        }}
        account={selectedAccount}
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
    </>
  );
};

export default WalletModals; 