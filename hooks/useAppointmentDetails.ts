import { Appointment } from "@/constants/types";
import { useAuthStore } from "@/store/auth-store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useCancelAppointment from "./mutation/useCancelAppointment";
import useCompleteAppointment from "./mutation/useCompleteAppointment";
import useCreateRating from "./mutation/useCreateRating";
import useSubmitReview from "./mutation/useSubmitReview";
import useGetAppointmentByUserId from "./query/useGetAppointmentByUserId";
import useGetProviderAppointments from "./query/useGetProviderAppointments";

export const useAppointmentDetails = () => {
  const { id } = useLocalSearchParams();
  const user = useAuthStore((state) => state.user);

  // State
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Hooks
  const hookResult = user?.userRole === 'SERVICE_SEEKER' ? useGetAppointmentByUserId : useGetProviderAppointments;
  const { data: appointments, isPending, error } = hookResult();
  const { handleCancelAppointment, isPending: isCancelling } = useCancelAppointment();
  const { handleCompleteAppointment, isPending: isCompleting } = useCompleteAppointment();
  const { handleCreateRating, isPending: isCreatingRating } = useCreateRating();
  const { handleCreateRating: handleCreateReview, isPending: isCreatingReview } = useSubmitReview();

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
    Alert.alert("Chat", "Open chat logic here");
  };

  const handleMarkCompleted = () => {
    setShowCompleteModal(true);
  };

  const handleShare = () => {
    Alert.alert("Share", "Share order details logic here");
  };

  const handleReport = () => {
    Alert.alert("Report Issue", "Report safety issue logic here");
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

    // Loading states
    isCancelling,
    isCompleting,
    isCreatingRating,
    isCreatingReview,

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
  };
}; 