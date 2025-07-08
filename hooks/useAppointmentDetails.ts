import { Appointment } from "@/constants/types";
import { useAuthStore } from "@/store/auth-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useAcceptBooking from "./mutation/useAcceptBooking";
import useCancelAppointment from "./mutation/useCancelAppointment";
import useCompleteAppointment from "./mutation/useCompleteAppointment";
import useCreateRating from "./mutation/useCreateRating";
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
  const [isReporting, setIsReporting] = useState(false);

  // Hooks
  const hookResult = user?.userRole === 'SERVICE_SEEKER' ? useGetAppointmentByUserId : useGetProviderAppointments;
  const { data: appointments, isPending, error } = hookResult();
  const { handleCancelAppointment, isPending: isCancelling } = useCancelAppointment();
  const { handleCompleteAppointment, isPending: isCompleting } = useCompleteAppointment();
  const { handleCreateRating, isPending: isCreatingRating } = useCreateRating();
  const { handleCreateRating: handleCreateReview, isPending: isCreatingReview } = useSubmitReview();
  const { handleAcceptBooking: acceptBooking, isPending: isAcceptingBooking } = useAcceptBooking();

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
  const isCanceled = appointment?.serviceStatus === 'CANCELED';
  const isCompleted = appointment?.serviceStatus === 'COMPLETED';
  const isAppointmentPending = appointment?.serviceStatus === 'PENDING';

  // Action handlers
  const handleReschedule = () => {
    Alert.alert("Reschedule", "Reschedule logic here");
  };

  const handleChat = () => {
    // TODO: Use correct provider email if available in appointment object
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
    if (appointment) {
      Alert.alert("Payment", "Payment functionality will be implemented soon!");
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
      handleCancelAppointment({ serviceAppointmentId: appointment.id });
    }
  };

  const handleConfirmComplete = () => {
    if (appointment) {
      handleCompleteAppointment({ serviceAppointmentId: appointment.id });
      setShowCompleteModal(false);
    }
  };

  const handleAcceptBooking = () => {
    if (appointment) {
      acceptBooking({ serviceAppointmentId: appointment.id });
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
    isCanceled,
    isCompleted,
    isAppointmentPending,

    // Modal states
    showCancelModal,
    showCompleteModal,
    showReviewModal,
    setShowCancelModal,
    setShowCompleteModal,
    setShowReviewModal,
    showReportModal,
    setShowReportModal,
    isReporting,

    // Loading states
    isCancelling,
    isCompleting,
    isCreatingRating,
    isCreatingReview,
    isAcceptingBooking,

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
    handleSubmitReport,
  };
}; 