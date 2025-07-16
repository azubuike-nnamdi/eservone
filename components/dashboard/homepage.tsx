import useInitiatePayment from "@/hooks/mutation/useInitiatePayment";
import useStripeInitiatePayment from "@/hooks/mutation/useStripeInitiatePayment";
import useGetUserProfileDetails from "@/hooks/query/useGetUserProfileDetails";
import { useAuthStore } from "@/store/auth-store";
import React, { useState } from "react";
import { Text, TouchableOpacity } from 'react-native';
import ServiceProviderHomepage from "./service-provider-homepage";
import ServiceSeekerHomepage from "./service-seeker-homepage";
import TopUpModal from "./TopUpModal";


export default function Homepage() {
   const { user } = useAuthStore();
   const [modalVisible, setModalVisible] = useState(false);
   const { data: userProfile } = useGetUserProfileDetails();

   console.log('userProfile', userProfile);
   const { handleStripeInitiatePayment, isPending } = useStripeInitiatePayment();
   const { handleInitiatePayment, isPending: isInitialPaymentPending } = useInitiatePayment();
   const [amount, setAmount] = useState('');

   const handleTopUp = () => {
      if (!amount || isNaN(Number(amount))) return;
      const payload = {
         amount: Number(amount),
         beneficiaryName: userProfile?.data?.firstName + ' ' + userProfile?.data?.lastName,
         narration: 'Wallet Top Up',
         senderEmail: userProfile?.data?.emailAddress,
      };
      console.log('Top up payload:', payload);
      handleInitiatePayment(payload)

   };

   const isServiceSeeker = user?.userRole === "SERVICE_SEEKER";
   return (
      <>
         {isServiceSeeker ? <ServiceSeekerHomepage /> : <ServiceProviderHomepage />}
         {/* Floating + Button */}
         <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
               position: 'absolute',
               bottom: 96,
               right: 32,
               zIndex: 50,
               backgroundColor: '#7C6AED',
               borderRadius: 32,
               width: 56,
               height: 56,
               justifyContent: 'center',
               alignItems: 'center',
               shadowColor: '#000',
               shadowOffset: { width: 0, height: 2 },
               shadowOpacity: 0.2,
               shadowRadius: 4,
               elevation: 5,
            }}
         >
            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold', marginTop: -2 }}>+</Text>
         </TouchableOpacity>
         <TopUpModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            amount={amount}
            setAmount={setAmount}
            onTopUp={handleTopUp}
            isPending={isInitialPaymentPending}
         />
      </>
   );
}
