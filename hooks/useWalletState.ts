import { useToast } from '@/context/toast-context';
import useInitiatePayment from '@/hooks/mutation/useInitiatePayment';
import useWithdrawFunds from '@/hooks/mutation/useWithdrawFunds';
import { useGetAccountBalance } from '@/hooks/query/useGetAccountBalance';
import { useGetBeneficiaries } from '@/hooks/query/useGetBeneficiaries';
import useGetUserProfileDetails from '@/hooks/query/useGetUserProfileDetails';
import { useAuthStore } from '@/store/auth-store';
import { useEffect, useState } from 'react';

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

  // Withdraw modal state
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawError, setWithdrawError] = useState('');

  // Queries
  const { data: accountBalance, isPending } = useGetAccountBalance();
  const { data: beneficiaries, isPending: isLoadingBeneficiaries } = useGetBeneficiaries();
  const { data: userProfile } = useGetUserProfileDetails();
  const { handleInitiatePayment, isPending: isInitiatingPayment } = useInitiatePayment();
  const { handleWithdrawFunds, isPending: isWithdrawing, isSuccess: isWithdrawSuccess } = useWithdrawFunds();
  const { user } = useAuthStore();
  const { showToast } = useToast();

  // Derived state
  const beneficiariesData = beneficiaries?.data || [];
  const balance = accountBalance?.data?.accountBalance ?? 0;
  const currency = accountBalance?.data?.currency;

  // Handle withdrawal success
  useEffect(() => {
    if (isWithdrawSuccess) {
      // Show success toast
      showToast('Withdrawal initiated successfully!', 'success');

      // Close modal and reset
      setWithdrawModalVisible(false);
      setWithdrawAmount('');
      setWithdrawError('');
      setSelectedAccount(null);
    }
  }, [isWithdrawSuccess, showToast]);

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

  const openWithdrawModal = () => {
    // Check if user has bank accounts
    if (beneficiariesData.length === 0) {
      showToast('Please add a bank account first', 'error');
      return;
    }

    // Use the first bank account as default
    setSelectedAccount(beneficiariesData[0]);
    setWithdrawAmount('');
    setWithdrawError('');
    setWithdrawModalVisible(true);
  };

  const handleWithdrawSubmit = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
      setWithdrawError('Please enter a valid amount');
      return;
    }

    const amountNum = Number(withdrawAmount);
    if (amountNum <= 0) {
      setWithdrawError('Amount must be greater than 0');
      return;
    }

    if (amountNum > balance) {
      setWithdrawError(`Amount cannot exceed your balance of ${currency} ${balance}`);
      return;
    }

    if (!selectedAccount) {
      setWithdrawError('Please select a bank account');
      return;
    }

    const payload = {
      accountName: selectedAccount.nickName,
      accountNumber: selectedAccount.accountNumber,
      amount: withdrawAmount,
      bankCode: selectedAccount.bankCode,
      description: 'Wallet Withdrawal',
      senderWalletId: user?.email || '',
    };

    handleWithdrawFunds(payload);
  };

  const handleSeeAllWithdrawals = () => {
    setWithdrawalModalVisible(true);
  };

  const handleAddAccount = () => {
    setAddAccountModalVisible(true);
  };

  const handleViewAccountDetails = (account: BankAccount) => {
    // console.log('Selected account details:', account);
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
    withdrawModalVisible,
    setWithdrawModalVisible,
    withdrawAmount,
    setWithdrawAmount,
    withdrawError,
    setWithdrawError,

    // Data
    beneficiariesData,
    balance,
    currency,
    userProfile,

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
  };
}; 