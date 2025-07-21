import useInitiatePayment from "@/hooks/mutation/useInitiatePayment";
import useGetTransactionQuery from '@/hooks/query/useGetTransactionQuery';
import useGetUserProfileDetails from "@/hooks/query/useGetUserProfileDetails";
import { useAuthStore } from "@/store/auth-store";
import React, { useState } from "react";
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import PaystackWebviewRobustModal from "./PaystackWebviewRobustModal";
import ServiceProviderHomepage from "./service-provider-homepage";
import ServiceSeekerHomepage from "./service-seeker-homepage";
import TopUpModal from "./TopUpModal";


export default function Homepage() {
   const { user } = useAuthStore();
   const [modalVisible, setModalVisible] = useState(false);
   const [paystackUrl, setPaystackUrl] = useState<string | null>(null);
   const [showStatusModal, setShowStatusModal] = useState(false);
   const [transactionReference, setTransactionReference] = useState<string | null>(null);
   const { data: userProfile } = useGetUserProfileDetails();
   const { handleInitiatePayment, isPending } = useInitiatePayment();
   const [amount, setAmount] = useState('');

   const { data: transactionData, isPending: isVerifying, error: verifyError } = useGetTransactionQuery(transactionReference || '');

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
                  // Extract reference from URL
                  const refMatch = url.match(/[?&]reference=([^&]+)/);
                  const reference = refMatch ? refMatch[1] : null;
                  setTransactionReference(reference || null);
                  setShowStatusModal(true);
               }}
            />
         )}
         {showStatusModal && (
            <Modal
               visible={showStatusModal}
               transparent
               animationType="fade"
               onRequestClose={() => {
                  setShowStatusModal(false);
                  setTransactionReference(null);
               }}
            >
               <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 32, alignItems: 'center' }}>
                     {isVerifying ? (
                        <ActivityIndicator size="large" color="#7C6AED" />
                     ) : verifyError ? (
                        <>
                           <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'red', marginBottom: 12 }}>Verification Failed</Text>
                           <Text style={{ fontSize: 16, color: '#333', marginBottom: 24 }}>Could not verify your payment. Please try again.</Text>
                           <TouchableOpacity onPress={() => setShowStatusModal(false)} style={{ backgroundColor: '#7C6AED', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 24 }}>
                              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Close</Text>
                           </TouchableOpacity>
                        </>
                     ) : (
                        <>
                           <Text style={{ fontSize: 24, fontWeight: 'bold', color: transactionData?.status === 'success' ? 'green' : 'red', marginBottom: 12 }}>
                              {transactionData?.status === 'success' ? 'Payment Successful!' : 'Payment Failed'}
                           </Text>
                           <Text style={{ fontSize: 16, color: '#333', marginBottom: 24 }}>
                              {transactionData?.status === 'success'
                                 ? 'Thank you for topping up your wallet.'
                                 : 'Your payment was not successful. Please try again.'}
                           </Text>
                           <TouchableOpacity onPress={() => setShowStatusModal(false)} style={{ backgroundColor: '#7C6AED', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 24 }}>
                              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Close</Text>
                           </TouchableOpacity>
                        </>
                     )}
                  </View>
               </View>
            </Modal>
         )}
      </>
   );
}
