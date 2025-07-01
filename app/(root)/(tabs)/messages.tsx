import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ProfileHeader from "@/components/common/profile-header";
import { AppointmentItem } from "@/components/messages/appointment-item";
import useGetAppointmentByUserId from "@/hooks/query/useGetAppointmentByUserId";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Messages() {

  const { data: appointments, isPending, error } = useGetAppointmentByUserId();

  const handleAppointmentPress = (appointmentId: number) => {
    // Navigate to appointment details or message room
    console.log("Appointment pressed:", appointmentId);
    // router.push(`/appointment-details/${appointmentId}`);
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
            Error Loading Appointments
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
          No appointments found
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ProfileHeader title="Messages" showNotification={false} />
      <FlatList
        data={appointments?.data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AppointmentItem
            appointment={item}
            onPress={() => handleAppointmentPress(item.id)}
          />
        )}
        contentContainerStyle={{ paddingTop: 8 }}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
} 