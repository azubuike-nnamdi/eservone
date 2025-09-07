import { Appointment } from "@/constants/types";
import { useAuthStore } from "@/store/auth-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useAcceptBooking from "./mutation/useAcceptBooking";
import useCreateRating from "./mutation/useCreateRating";
import useDeclineAppointment from "./mutation/useDeclineAppointment";
import useMakeBookingPayment from "./mutation/useMakeBookingPayment";
import useProviderCancelAppointment from "./mutation/useProviderCancelAppointment";
import useProviderCompleteAppointment from "./mutation/useProviderCompleteAppointment";
import useSeekerCancelAppointment from "./mutation/useSeekerCancelAppointment";
import useSeekerCompleteAppointment from "./mutation/useSeekerCompleteAppointment";
import useSubmitReview from "./mutation/useSubmitReview";
import useGetAppointmentByUserId from "./query/useGetAppointmentByUserId";
import useGetProviderAppointments from "./query/useGetProviderAppointments";

export const useAppointmentDetails = () => {
  const { id } = useLocalSearchParams();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  // State
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  // Hooks
  const hookResult = user?.userRole === 'SERVICE_SEEKER' ? useGetAppointmentByUserId : useGetProviderAppointments;
  const { data: appointments, isPending, error } = hookResult();
  const { handleSeekerCancelAppointment, isPending: isSeekerCancelling } = useSeekerCancelAppointment();
  const { handleProviderCancelAppointment, isPending: isProviderCancelling } = useProviderCancelAppointment();
  const { handleSeekerCompleteAppointment, isPending: isCompletingSeeker } = useSeekerCompleteAppointment();
  const { handleProviderCompleteAppointment, isPending: isCompletingProvider } = useProviderCompleteAppointment();
  const { handleCreateRating, isPending: isCreatingRating } = useCreateRating();
  const { handleCreateRating: handleCreateReview, isPending: isCreatingReview } = useSubmitReview();
  const { handleAcceptBooking: acceptBooking, isPending: isAcceptingBooking } = useAcceptBooking();
  const { handleDeclineAppointment, isPending: isDecliningAppointment } = useDeclineAppointment();
  const { handleMakeBookingPayment, isPending: isMakingPayment } = useMakeBookingPayment();

  // Effects
  useEffect(() => {
    if (appointments?.data && id) {
      const found = appointments.data.find((a: Appointment) => String(a.id) === String(id));
      setAppointment(found || null);
    }
  }, [appointments?.data, id]);

  // Computed values
  const isSeeker = user?.userRole === 'SERVICE_SEEKER';
  const isProvider = user?.userRole === 'SERVICE_PROVIDER';



  // Appointment approval status
  const isAppointmentPending = appointment?.serviceAppointmentStatus === 'PENDING';

  // Service completion status (only when both parties complete)
  const isServiceCompleted = appointment?.seekerServiceStatus === 'COMPLETED' && appointment?.providerServiceStatus === 'COMPLETED';
  const isServiceCanceled = appointment?.serviceAppointmentStatus === 'CANCELED';

  // Individual completion status
  const hasUserCompleted = isSeeker
    ? appointment?.seekerServiceStatus === 'COMPLETED'
    : appointment?.providerServiceStatus === 'COMPLETED';

  const hasOtherPartyCompleted = isSeeker
    ? appointment?.providerServiceStatus === 'COMPLETED'
    : appointment?.seekerServiceStatus === 'COMPLETED';

  const needsBothCompletion = appointment?.seekerServiceStatus === 'PENDING' && appointment?.providerServiceStatus === 'PENDING';

  // Action handlers
  const handleReschedule = () => {
    Alert.alert("Reschedule", "Reschedule logic here");
  };

  const handleChat = () => {

    if (appointment && appointment.chatRoomId && appointment.userEmail) {
      router.push(`/message-room/${appointment.chatRoomId}?receiverEmail=${appointment.serviceProviderEmail}&userEmail=${appointment.userEmail}`);
    } else {
      Alert.alert("Chat", "Chat information is missing.");
    }
  };

  const handleMarkCompleted = () => {
    setShowCompleteModal(true);
  };

  const handleShare = () => {
    Alert.alert("Share", "Share order details logic here");
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

  const handleSubmitReview = (rating: number, comment: string) => {
    if (appointment) {
      // Submit rating first
      handleCreateRating({ ratings: rating, serviceId: appointment.id });

      // Submit review with service ID and comment
      if (appointment.id) {
        handleCreateReview({
          serviceAppointmentId: appointment.id,
          content: comment
        });
      }

      setShowReviewModal(false);
    }
  };

  const handlePayNow = () => {
    if (appointment && user) {
      const payload = {
        amount: String(appointment.costOfService),
        description: `Payment for ${appointment.serviceName}`,
        receiverWalletId: appointment?.serviceProviderEmail,
        serviceAppointmentId: appointment?.id,
        senderWalletId: user?.email
      };

      handleMakeBookingPayment(payload);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleReview = () => {
    setShowReviewModal(true);
  };

  const handleConfirmCancel = () => {
    if (appointment) {
      if (isSeeker) {
        handleSeekerCancelAppointment({ serviceAppointmentId: appointment.id });
      } else if (isProvider) {
        handleProviderCancelAppointment({ serviceAppointmentId: appointment.id });
      }
    }
  };

  const handleConfirmComplete = () => {
    if (appointment) {
      if (isSeeker) {
        handleSeekerCompleteAppointment({ serviceAppointmentId: appointment.id });
      } else if (isProvider) {
        handleProviderCompleteAppointment({ serviceAppointmentId: appointment.id });
      }
      setShowCompleteModal(false);
    }
  };

  const handleAcceptBooking = () => {
    if (appointment) {
      acceptBooking({ serviceAppointmentId: appointment.id });
    }
  };

  const handleDecline = () => {
    setShowDeclineModal(true);
  };

  const handleConfirmDecline = () => {
    if (appointment) {
      handleDeclineAppointment({ serviceAppointmentId: appointment.id });
      setShowDeclineModal(false);
    }
  };

  const handleSubmitReport = async (issueType: string, description: string) => {
    setIsReporting(true);
    // TODO: Implement actual report submission logic (API call)
    setTimeout(() => {
      setIsReporting(false);
      setShowReportModal(false);
      Alert.alert("Reported", "Your issue has been reported.");
    }, 1200);
  };

  return {
    // Data
    appointment,
    isPending,
    error,

    // Computed values
    isSeeker,
    isProvider,
    isCanceled: isServiceCanceled,
    isCompleted: isServiceCompleted,
    isAppointmentPending,
    hasUserCompleted,
    needsBothCompletion,
    hasOtherPartyCompleted,

    // Modal states
    showCancelModal,
    showCompleteModal,
    showReviewModal,
    showDeclineModal,
    setShowCancelModal,
    setShowCompleteModal,
    setShowReviewModal,
    setShowDeclineModal,
    showReportModal,
    setShowReportModal,
    isReporting,

    // Loading states
    isCancelling: isSeekerCancelling || isProviderCancelling,
    isCompleting: isCompletingSeeker || isCompletingProvider,
    isCompletingSeeker,
    isCompletingProvider,
    isCreatingRating,
    isCreatingReview,
    isAcceptingBooking,
    isDecliningAppointment,
    isMakingPayment,

    // Action handlers
    handleReschedule,
    handleChat,
    handleMarkCompleted,
    handleShare,
    handleReport,
    handleSubmitReview,
    handlePayNow,
    handleCancel,
    handleReview,
    handleConfirmCancel,
    handleConfirmComplete,
    handleAcceptBooking,
    handleDecline,
    handleConfirmDecline,
    handleSubmitReport,

  };
}; 