import AppointmentSection from "@/components/appointments/appointment-section";
import ProfileHeader from "@/components/common/profile-header";
import { historyAppointments, upcomingAppointments } from "@/constants/data";
import { Appointment } from "@/constants/types";
import { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32'>
        <ProfileHeader title='Appointments' showNotification={false} />

        <View className="mt-6 px-7">
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