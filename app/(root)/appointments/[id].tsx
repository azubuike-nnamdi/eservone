import CancelAppointmentModal from "@/components/appointments/cancel-appointment-modal";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ProfileHeader from "@/components/common/profile-header";
import icons from "@/constants/icons";
import { Appointment } from "@/constants/types";
import useCancelAppointment from "@/hooks/mutation/useCancelAppointment";
import useGetAppointmentByUserId from "@/hooks/query/useGetAppointmentByUserId";
import { formatDate, formatTime } from "@/lib/helper";
import { useAuthStore } from "@/store/auth-store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppointmentDetails() {
  const { id } = useLocalSearchParams();

  const user = useAuthStore((state) => state.user);
  const { data: appointments, isPending, error } = useGetAppointmentByUserId();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { handleCancelAppointment, isPending: isCancelling } = useCancelAppointment();

  useEffect(() => {
    if (appointments?.data && id) {
      const found = appointments.data.find((a: Appointment) => String(a.id) === String(id));
      setAppointment(found || null);
    }
  }, [appointments?.data, id]);


  const handleReschedule = () => {
    Alert.alert("Reschedule", "Reschedule logic here");
  };
  const handleChat = () => {
    Alert.alert("Chat", "Open chat logic here");
  };
  const handleMarkCompleted = () => {
    Alert.alert("Mark as Completed", "Service marked as completed!");
  };
  const handleShare = () => {
    Alert.alert("Share", "Share order details logic here");
  };
  const handleReport = () => {
    Alert.alert("Report Issue", "Report safety issue logic here");
  };

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

  // Role checks
  const isSeeker = user?.userRole === 'SERVICE_SEEKER';
  const isProvider = user?.userRole === 'SERVICE_PROVIDER';

  // Status checks
  const isCanceled = appointment.serviceStatus === 'CANCELED';
  const isCompleted = appointment.serviceStatus === 'COMPLETED';
  const isAppointmentPending = appointment.serviceStatus === 'PENDING';

  // UI rendering
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ProfileHeader title={"Appointment Details"} showNotification={false} />
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        {/* Two-column info grid */}
        <View className="flex-row justify-between mb-4">
          <View style={{ flex: 1 }}>
            <Text className="text-gray-400 text-xs mb-1">Date:</Text>
            <Text className="text-lg font-bold mb-2">{formatDate(appointment.appointmentDate)}</Text>
            <Text className="text-gray-400 text-xs mb-1">Service type:</Text>
            <Text className="text-base text-black mb-2">Home service</Text>
            <Text className="text-gray-400 text-xs mb-1">Customer address:</Text>
            <Text className="text-base text-black mb-2">{appointment.address || 'N/A'}</Text>
            <Text className="text-gray-400 text-xs mb-1">Buzz code:</Text>
            <Text className="text-base text-black mb-2">{appointment.buzzCode}</Text>
            <Text className="text-gray-400 text-xs mb-1">Upfront payment (%):</Text>
            <Text className="text-base text-black mb-2">{appointment.upfrontPayment}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 24 }}>
            <Text className="text-gray-400 text-xs mb-1">Time:</Text>
            <Text className="text-lg font-bold mb-2">{formatTime(appointment.appointmentDate)}</Text>
            <Text className="text-gray-400 text-xs mb-1">Pets:</Text>
            <Text className="text-base text-black mb-2">{appointment.hasPet ? 'Yes' : 'No'}</Text>
            <Text className="text-gray-400 text-xs mb-1">Cost:</Text>
            <Text className="text-base text-black mb-2">{appointment.costOfService}</Text>
          </View>
        </View>

        {/* Additional info */}
        <Text className="text-gray-400 text-xs mb-1">Additional information:</Text>
        <Text className="text-base text-black mb-6">
          {appointment.additionalDetails || 'N/A'}
        </Text>

        {/* Status indicator */}
        <View className="bg-gray-50 p-4 rounded-lg mb-6">
          <Text className="text-gray-400 text-xs mb-1">Status:</Text>
          <View className="flex-row items-center">
            <View className={`w-3 h-3 rounded-full mr-2 ${isAppointmentPending ? 'bg-yellow-500' :
              isCompleted ? 'bg-green-500' :
                'bg-red-500'
              }`} />
            <Text className={`text-base font-semibold ${isAppointmentPending ? 'text-yellow-700' :
              isCompleted ? 'text-green-700' :
                'text-red-700'
              }`}>
              {appointment.serviceStatus}
            </Text>
          </View>
        </View>

        {/* Actions - Only show for pending appointments */}
        {isAppointmentPending && (
          <View className="bg-white mb-6">
            {isSeeker && (
              <TouchableOpacity className="flex-row items-center  gap-4 py-4 border-b border-gray-200" onPress={handleReschedule}>
                <Image source={icons.rescheduleIcon} className="w-5 h-5" />
                <Text className="text-base text-black">Reschedule appointment</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity className="flex-row items-center  gap-4 py-4 border-b border-gray-200" onPress={handleChat}>
              <Image source={icons.chatIcon} className="w-5 h-5" />
              <Text className="text-base text-black">
                {isSeeker ? 'Chat with service provider' : 'Chat with seeker'}
              </Text>
            </TouchableOpacity>

            {isProvider && (
              <TouchableOpacity className="flex-row items-center  gap-4 py-4 border-b border-gray-200" onPress={handleMarkCompleted}>
                <Image source={icons.markCompletedIcon} className="w-5 h-5" />
                <Text className="text-base text-black">Mark service as completed</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity className="flex-row items-center  gap-4 py-4 border-b border-gray-200" onPress={handleShare}>
              <Image source={icons.shareIcon} className="w-5 h-5" />
              <Text className="text-base text-black">Share order details</Text>
            </TouchableOpacity>

            {isSeeker && (
              <TouchableOpacity className="flex-row items-center  gap-4 py-4" onPress={handleReport}>
                <Image source={icons.reportIcon} className="w-5 h-5" />
                <Text className="text-base text-black">Report a safety issue</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Show share and report options for all statuses */}
        {!isAppointmentPending && (
          <View className="bg-white mb-6">
            <TouchableOpacity className="flex-row items-center  gap-4 py-4 border-b border-gray-200" onPress={handleShare}>
              <Image source={icons.shareIcon} className="w-5 h-5" />
              <Text className="text-base text-black">Share order details</Text>
            </TouchableOpacity>

            {isSeeker && (
              <TouchableOpacity className="flex-row items-center  gap-4 py-4" onPress={handleReport}>
                <Image source={icons.reportIcon} className="w-5 h-5" />
                <Text className="text-base text-black">Report a safety issue</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Cancel appointment - Only for pending appointments and seekers */}
        {isAppointmentPending && isSeeker && (
          <TouchableOpacity className="flex-row items-center  gap-4 py-4" onPress={() => setShowCancelModal(true)}>
            <Image source={icons.cancelIcon} className="w-6 h-6" />
            <Text className="text-base font-semibold text-red-600">Cancel appointment</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      {/* Cancel Confirmation Modal */}
      <CancelAppointmentModal
        visible={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => {
          if (appointment) {
            handleCancelAppointment({ serviceAppointmentId: appointment.id });
          }
        }}
        isLoading={isCancelling}
      />
    </SafeAreaView>
  );
} 