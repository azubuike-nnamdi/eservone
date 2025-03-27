import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import ProfileHeader from "@/components/common/profile-header";
import { historyAppointments } from "@/constants/data";
import AppointmentSection from "@/components/appointments/appointment-section";
import { upcomingAppointments } from "@/constants/data";
import { useCallback } from "react";
import { Appointment } from "@/constants/types";
import { router } from "expo-router";
export default function Appointments() {

  const handleUpcomingAppointmentPress = useCallback((appointment: Appointment) => {
    // Navigate to appointment details
    // router.push({
    //   pathname: `/appointment-details/${appointment.id}`,
    //   params: { type: "upcoming" },
    // })
  }, [])

  const handleHistoryAppointmentPress = useCallback((appointment: Appointment) => {
    // Navigate to appointment details
    // router.push({
    //   pathname: `/appointment-details/${appointment.id}`,
    //   params: { type: "history" },
    // })
  }, [])
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <ProfileHeader title='Appointments' showNotification={false} />

        <View className="mt-6">
          <AppointmentSection
            title="Upcoming"
            type="upcoming"
            appointments={upcomingAppointments}
            onAppointmentPress={handleUpcomingAppointmentPress}
          />

          <AppointmentSection
            title="History"
            type="history"
            appointments={historyAppointments}
            onAppointmentPress={handleHistoryAppointmentPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}