import icons from "@/constants/icons";
import { Appointment } from "@/constants/types";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface AppointmentActionsSectionProps {
  appointment: Appointment;
  isSeeker: boolean;
  isProvider: boolean;
  isAppointmentPending: boolean;
  isCompleted: boolean;
  onReschedule: () => void;
  onChat: () => void;
  onMarkCompleted: () => void;
  onShare: () => void;
  onReport: () => void;
  onCancel: () => void;
  onReview: () => void;
  onPayNow: () => void;
  isCompleting: boolean;
  isMakingPayment: boolean;
}

const AppointmentActionsSection: React.FC<AppointmentActionsSectionProps> = ({
  appointment,
  isSeeker,
  isProvider,
  isAppointmentPending,
  isCompleted,
  onReschedule,
  onChat,
  onMarkCompleted,
  onShare,
  onReport,
  onCancel,
  onReview,
  onPayNow,
  isCompleting,
  isMakingPayment
}) => {
  return (
    <>
      {/* Actions - Only show for pending appointments */}
      {isAppointmentPending && (
        <View className="bg-white mb-6">
          {isSeeker && (
            <TouchableOpacity className="flex-row items-center gap-4 py-4 border-b border-gray-200" onPress={onReschedule}>
              <Image source={icons.rescheduleIcon} className="w-5 h-5" />
              <Text className="text-base text-black">Reschedule appointment</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity className="flex-row items-center gap-4 py-4 border-b border-gray-200" onPress={onChat}>
            <Image source={icons.chatIcon} className="w-5 h-5" />
            <Text className="text-base text-black">
              {isSeeker ? 'Chat with service provider' : 'Chat with seeker'}
            </Text>
          </TouchableOpacity>

          {isProvider && (
            <TouchableOpacity
              className="flex-row items-center gap-4 py-4 border-b border-gray-200"
              onPress={onMarkCompleted}
              disabled={isCompleting}
            >
              <Image source={icons.markCompletedIcon} className="w-5 h-5" />
              <Text className="text-base text-black">
                {isCompleting ? 'Marking as completed...' : 'Mark service as completed'}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity className="flex-row items-center gap-4 py-4 border-b border-gray-200" onPress={onShare}>
            <Image source={icons.shareIcon} className="w-5 h-5" />
            <Text className="text-base text-black">Share order details</Text>
          </TouchableOpacity>

          {isSeeker && (
            <TouchableOpacity className="flex-row items-center gap-4 py-4" onPress={onReport}>
              <Image source={icons.reportIcon} className="w-5 h-5" />
              <Text className="text-base text-black">Report a safety issue</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Show share and report options for all statuses */}
      {!isAppointmentPending && (
        <View className="bg-white mb-6">
          <TouchableOpacity className="flex-row items-center gap-4 py-4 border-b border-gray-200" onPress={onShare}>
            <Image source={icons.shareIcon} className="w-5 h-5" />
            <Text className="text-base text-black">Share order details</Text>
          </TouchableOpacity>

          {isSeeker && (
            <TouchableOpacity className="flex-row items-center gap-4 py-4" onPress={onReport}>
              <Image source={icons.reportIcon} className="w-5 h-5" />
              <Text className="text-base text-black">Report a safety issue</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Cancel appointment - Only for pending appointments */}
      {isAppointmentPending && (
        <TouchableOpacity className="flex-row items-center gap-4 py-4" onPress={onCancel}>
          <Image source={icons.cancelIcon} className="w-6 h-6" />
          <Text className="text-base font-semibold text-red-600">Cancel appointment</Text>
        </TouchableOpacity>
      )}

      {/* Review Section - Only for completed appointments and seekers */}
      {isCompleted && isSeeker && (
        <TouchableOpacity className="flex-row items-center gap-4 py-4" onPress={onReview}>
          <Image source={icons.star} className="w-5 h-5" />
          <Text className="text-base text-black">Submit a review</Text>
        </TouchableOpacity>
      )}

      {/* Payment Section - Only for completed appointments and seekers */}
      {isCompleted && isSeeker && (
        <View className="bg-white mb-6">
          <Text className="text-lg font-bold mb-4">Payment</Text>
          <TouchableOpacity
            className="bg-green-600 py-4 rounded-lg"
            onPress={onPayNow}
            disabled={isMakingPayment}
          >
            <Text className="text-center text-white font-semibold text-lg">
              {isMakingPayment ? 'Processing Payment...' : 'Pay Now'}
            </Text>
          </TouchableOpacity>
          <Text className="text-sm text-gray-500 mt-2 text-center">
            Amount: ₦{appointment.costOfService}
          </Text>
        </View>
      )}
    </>
  );
};

export default AppointmentActionsSection; 