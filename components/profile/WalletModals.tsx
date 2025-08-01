import PaystackWebviewRobustModal from '@/components/dashboard/PaystackWebviewRobustModal';
import TopUpModal from '@/components/dashboard/TopUpModal';
import React from 'react';
import AddBankAccountModal from './AddBankAccountModal';
import BankAccountDetailsModal from './BankAccountDetailsModal';
import WithdrawModal from './WithdrawModal';
import WithdrawalHistoryModal from './WithdrawalHistoryModal';

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

  // Withdrawal History Modal
  withdrawalModalVisible: boolean;
  setWithdrawalModalVisible: (visible: boolean) => void;

  // Withdraw Modal
  withdrawModalVisible: boolean;
  setWithdrawModalVisible: (visible: boolean) => void;
  withdrawAmount: string;
  setWithdrawAmount: (amount: string) => void;
  withdrawError: string;
  balance: number;
  currency: string;
  onWithdrawSubmit: () => void;
  isWithdrawPending?: boolean;

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
  withdrawModalVisible,
  setWithdrawModalVisible,
  withdrawAmount,
  setWithdrawAmount,
  withdrawError,
  balance,
  currency,
  onWithdrawSubmit,
  isWithdrawPending,
  paystackUrl,
  setPaystackUrl
}) => {
  return (
    <>
      {/* Withdrawal History Modal */}
      <WithdrawalHistoryModal
        visible={withdrawalModalVisible}
        onClose={() => setWithdrawalModalVisible(false)}
        currency={currency}
      />

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

      <WithdrawModal
        visible={withdrawModalVisible}
        onClose={() => setWithdrawModalVisible(false)}
        amount={withdrawAmount}
        setAmount={setWithdrawAmount}
        error={withdrawError}
        balance={balance}
        currency={currency}
        selectedAccount={selectedAccount}
        onSubmit={onWithdrawSubmit}
        isPending={isWithdrawPending}
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