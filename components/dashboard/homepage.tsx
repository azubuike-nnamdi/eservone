import useInitiatePayment from "@/hooks/mutation/useInitiatePayment";
import useGetUserProfileDetails from "@/hooks/query/useGetUserProfileDetails";
import { useAuthStore } from "@/store/auth-store";
import React, { useState } from "react";
import { Text, TouchableOpacity } from 'react-native';
import PaymentStatusModal from "./payment-status-modal";
import PaystackWebviewRobustModal from "./PaystackWebviewRobustModal";
import ServiceProviderHomepage from "./service-provider-homepage";
import ServiceSeekerHomepage from "./service-seeker-homepage";
import TopUpModal from "./TopUpModal";


export default function Homepage() {
   const { user } = useAuthStore();
   const [modalVisible, setModalVisible] = useState(false);
   const [paystackUrl, setPaystackUrl] = useState<string | null>(null);
   const [showStatusModal, setShowStatusModal] = useState(false);
   const { data: userProfile } = useGetUserProfileDetails();
   const { handleInitiatePayment, isPending } = useInitiatePayment();
   const [amount, setAmount] = useState('');

   // This function is called when user presses "Top Up" in the modal
   const handleTopUp = async () => {
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
            isPending={isPending}
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
                  setShowStatusModal(true);
               }}
            />
         )}
         <PaymentStatusModal
            visible={showStatusModal}
            onClose={() => setShowStatusModal(false)}
         />
      </>
   );
}
