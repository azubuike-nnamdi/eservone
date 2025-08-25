import AppointmentActionsSection from "@/components/appointments/appointment-actions-section";
import AppointmentInfoSection from "@/components/appointments/appointment-info-section";
import AppointmentStatusIndicator from "@/components/appointments/appointment-status-indicator";
import CancelAppointmentModal from "@/components/appointments/cancel-appointment-modal";
import CompleteAppointmentModal from "@/components/appointments/complete-appointment-modal";
import IssueReportModal from "@/components/appointments/issue-report-modal";
import ReviewSubmissionModal from "@/components/appointments/review-submission-modal";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ProfileHeader from "@/components/common/profile-header";
import { useAppointmentDetails } from "@/hooks/useAppointmentDetails";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppointmentDetails() {
  const {
    appointment,
    isPending,
    error,
    isSeeker,
    isProvider,
    isCompleted,
    isAppointmentPending,
    showCancelModal,
    showCompleteModal,
    showReviewModal,
    showReportModal,
    setShowCancelModal,
    setShowCompleteModal,
    setShowReviewModal,
    setShowReportModal,
    isCancelling,
    isCompleting,
    isCreatingRating,
    isCreatingReview,
    isMakingPayment,
    isReporting,
    handleReschedule,
    handleChat,
    handleMarkCompleted,
    handleShare,
    handleReport,
    handleSubmitReview,
    handleSubmitReport,
    handlePayNow,
    handleCancel,
    handleReview,
    handleConfirmCancel,
    handleConfirmComplete,
    handleAcceptBooking,
    isAcceptingBooking,
    needsBothCompletion,
  } = useAppointmentDetails();

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ProfileHeader title="Appointment Details" showNotification={false} />
        <View className="mt-6 px-7">
          <LoadingSkeleton count={6} />
        </View>
      </SafeAreaView>
    );
  }

  // console.log('appointment in id', appointment);
  if (error || !appointment) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ProfileHeader title="Appointment Details" showNotification={false} />
        <View className="flex-1 justify-center items-center mt-20 px-4">
          <Text className="text-red-500 text-center text-lg font-semibold mb-2">
            Appointment not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // console.log('appointment in id', appointment);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ProfileHeader title="Appointment Details" showNotification={false} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <AppointmentInfoSection appointment={appointment} />
        <AppointmentStatusIndicator appointment={appointment} />
        <AppointmentActionsSection
          appointment={appointment}
          isSeeker={isSeeker}
          isProvider={isProvider}
          isAppointmentPending={isAppointmentPending}
          isCompleted={isCompleted}
          onReschedule={handleReschedule}
          onChat={handleChat}
          onMarkCompleted={handleMarkCompleted}
          onShare={handleShare}
          onReport={handleReport}
          onCancel={handleCancel}
          onReview={handleReview}
          onPayNow={handlePayNow}
          isCompleting={isCompleting}
          isMakingPayment={isMakingPayment}
          onAcceptBooking={handleAcceptBooking}
          isAcceptingBooking={isAcceptingBooking}
          needsBothCompletion={needsBothCompletion}
        />
      </ScrollView>

      {/* Modals */}
      <CancelAppointmentModal
        visible={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        isLoading={isCancelling}
      />

      <CompleteAppointmentModal
        visible={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        onConfirm={handleConfirmComplete}
        isLoading={isCompleting}
      />

      <ReviewSubmissionModal
        visible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
        isLoading={isCreatingRating || isCreatingReview}
      />

      <IssueReportModal
        visible={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleSubmitReport}
        isLoading={isReporting}
      />
    </SafeAreaView>
  );
} 