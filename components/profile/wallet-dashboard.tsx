import { useWalletState } from '@/hooks/useWalletState';
import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import WalletCard from '../common/wallet-card';
import BankAccountsSection from './BankAccountsSection';
import WalletActionButtons from './WalletActionButtons';
import WalletModals from './WalletModals';
import WithdrawalActivity from './WithdrawalActivity';

const WalletDashboard = () => {
  const {
    // State
    withdrawalModalVisible,
    setWithdrawalModalVisible,
    addAccountModalVisible,
    setAddAccountModalVisible,
    detailsModalVisible,
    setDetailsModalVisible,
    selectedAccount,
    setSelectedAccount,
    amount,
    setAmount,
    modalVisible,
    setModalVisible,
    paystackUrl,
    setPaystackUrl,
    withdrawModalVisible,
    setWithdrawModalVisible,
    withdrawAmount,
    setWithdrawAmount,
    withdrawError,


    // Data
    beneficiariesData,
    balance,
    currency,

    // Loading states
    isPending,
    isLoadingBeneficiaries,
    isInitiatingPayment,
    isWithdrawing,
    isWithdrawSuccess,

    // Handlers
    handleAddFunds,
    openWithdrawModal,
    handleWithdrawSubmit,
    handleSeeAllWithdrawals,
    handleAddAccount,
    handleViewAccountDetails,
    handleRemoveAccount,
  } = useWalletState();

  if (isPending || isLoadingBeneficiaries) {
    return <ActivityIndicator className='flex-1 justify-center items-center' />;
  }

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      <WalletCard
        balance={balance}
        currency={currency}
        showChevron={false}
      />

      <WalletActionButtons
        onAddFunds={() => setModalVisible(true)}
        onWithdrawFunds={openWithdrawModal}
      />

      <WithdrawalActivity
        currency={currency}
        balance={balance}
        onSeeAllWithdrawals={handleSeeAllWithdrawals}
      />

      <BankAccountsSection
        beneficiariesData={beneficiariesData}
        onAddAccount={handleAddAccount}
        onViewAccountDetails={handleViewAccountDetails}
      />

      <WalletModals
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        amount={amount}
        setAmount={setAmount}
        onTopUp={handleAddFunds}
        isInitiatingPayment={isInitiatingPayment}
        addAccountModalVisible={addAccountModalVisible}
        setAddAccountModalVisible={setAddAccountModalVisible}
        detailsModalVisible={detailsModalVisible}
        setDetailsModalVisible={setDetailsModalVisible}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
        withdrawalModalVisible={withdrawalModalVisible}
        setWithdrawalModalVisible={setWithdrawalModalVisible}
        withdrawModalVisible={withdrawModalVisible}
        setWithdrawModalVisible={setWithdrawModalVisible}
        withdrawAmount={withdrawAmount}
        setWithdrawAmount={setWithdrawAmount}
        withdrawError={withdrawError}
        balance={balance}
        currency={currency}
        onWithdrawSubmit={handleWithdrawSubmit}
        isWithdrawPending={isWithdrawing}
        paystackUrl={paystackUrl}
        setPaystackUrl={setPaystackUrl}
      />
    </ScrollView>
  );
}

export default WalletDashboard