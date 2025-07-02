import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ProfileHeader from "@/components/common/profile-header";
import { AppointmentItem } from "@/components/messages/appointment-item";
import { Appointment } from "@/constants/types";
import useGetAppointmentByUserId from "@/hooks/query/useGetAppointmentByUserId";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Messages() {
  const router = useRouter();

  const { data: appointments, isPending, error } = useGetAppointmentByUserId();


  // Filter to show only pending appointments
  const pendingAppointments = appointments?.data?.filter(
    (appointment: Appointment) => appointment.serviceStatus === 'PENDING'
  ) || [];


  const handleAppointmentPress = (chatRoomId: string, serviceProviderEmail: string) => {
    // Navigate to appointment details or message room
    router.push(`/message-room/${chatRoomId}?userEmail=${serviceProviderEmail}`);
  };

  const renderEmptyComponent = () => {
    if (isPending) {
      return (
        <View className="flex-1 justify-center items-center mt-20">
          <LoadingSkeleton count={3} />
        </View>
      );
    }

    if (error) {
      return (
        <View className="flex-1 justify-center items-center mt-20 px-4">
          <Text className="text-red-500 text-center text-lg font-semibold mb-2">
            Error Loading Pending Appointments
          </Text>
          <Text className="text-zinc-500 text-center">
            {error.message || "Something went wrong. Please try again later."}
          </Text>
        </View>
      );
    }

    return (
      <View className="flex-1 justify-center items-center mt-20">
        <Text className="text-zinc-500 text-center">
          No pending appointments found
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ProfileHeader title="Messages" showNotification={false} />
      <FlatList
        data={pendingAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AppointmentItem
            appointment={item}
            onPress={() => handleAppointmentPress(item.chatRoomId, item.serviceProviderEmail)}
          />
        )}
        contentContainerStyle={{ paddingTop: 8 }}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
} 