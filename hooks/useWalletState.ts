import useInitiatePayment from '@/hooks/mutation/useInitiatePayment';
import { useGetAccountBalance } from '@/hooks/query/useGetAccountBalance';
import { useGetBeneficiaries } from '@/hooks/query/useGetBeneficiaries';
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails';
import { useState } from 'react';

interface BankAccount {
  id: number;
  accountNumber: string;
  bankCode: string;
  emailAddress: string;
  nickName: string;
  newNickname?: string | null;
}

export const useWalletState = () => {
  // State
  const [withdrawalModalVisible, setWithdrawalModalVisible] = useState(false);
  const [addAccountModalVisible, setAddAccountModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [amount, setAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [paystackUrl, setPaystackUrl] = useState<string | null>(null);

  // Queries
  const { data: accountBalance, isPending } = useGetAccountBalance();
  const { data: beneficiaries, isPending: isLoadingBeneficiaries } = useGetBeneficiaries();
  const { data: userProfile } = useGetUserProfileDetails();
  const { handleInitiatePayment, isPending: isInitiatingPayment } = useInitiatePayment();

  // Derived state
  const beneficiariesData = beneficiaries?.data || [];
  const balance = accountBalance?.data?.accountBalance ?? 0;
  const currency = accountBalance?.data?.currency;

  // Handlers
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
      setModalVisible(false);
      setPaystackUrl(url);
    }
  };

  const handleWithdrawFunds = () => {
    console.log('Withdraw funds pressed');
  };

  const handleSeeAllWithdrawals = () => {
    setWithdrawalModalVisible(true);
  };

  const handleAddAccount = () => {
    setAddAccountModalVisible(true);
  };

  const handleViewAccountDetails = (account: BankAccount) => {
    console.log('Selected account details:', account);
    setSelectedAccount(account);
    setDetailsModalVisible(true);
  };

  const handleRemoveAccount = (accountId: string) => {
    console.log('Remove account:', accountId);
  };

  return {
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

    // Data
    beneficiariesData,
    balance,
    currency,
    userProfile,

    // Loading states
    isPending,
    isLoadingBeneficiaries,
    isInitiatingPayment,

    // Handlers
    handleAddFunds,
    handleWithdrawFunds,
    handleSeeAllWithdrawals,
    handleAddAccount,
    handleViewAccountDetails,
    handleRemoveAccount,
  };
}; 