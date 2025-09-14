import AppointmentCard from "@/components/appointments/appointment-card";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ProfileHeader from "@/components/common/profile-header";
import { Appointment } from "@/constants/types";
import useGetAppointmentByUserId from "@/hooks/query/useGetAppointmentByUserId";
import useGetProviderAppointments from "@/hooks/query/useGetProviderAppointments";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Helper to section appointments
function sectionAppointments(appointments: Appointment[] = []) {
  const upcoming: Appointment[] = [];
  const history: Appointment[] = [];
  appointments?.forEach((appointment) => {
    // Service is only completed when BOTH seeker and provider complete
    const isServiceCompleted = appointment?.seekerServiceStatus === 'COMPLETED' && appointment?.providerServiceStatus === 'COMPLETED';
    const isServiceCanceled = appointment?.serviceAppointmentStatus === 'CANCELED';
    const isServiceDeclined = appointment?.serviceAppointmentStatus === 'DECLINE';

    if (isServiceCompleted || isServiceCanceled || isServiceDeclined) {
      history.push(appointment);
    } else {
      upcoming.push(appointment);
    }
  });

  // Sort both arrays by appointmentDate in descending order (latest first)
  const sortByDate = (a: Appointment, b: Appointment) => {
    const dateA = new Date(a.appointmentDate).getTime();
    const dateB = new Date(b.appointmentDate).getTime();
    return dateB - dateA; // Descending order (latest first)
  };

  upcoming.sort(sortByDate);
  history.sort(sortByDate);

  return { upcoming, history };
}


export default function Appointments() {
  const user = useAuthStore((state) => state.user);
  const hookResult = user?.userRole === 'SERVICE_SEEKER' ? useGetAppointmentByUserId : useGetProviderAppointments;
  const { data: appointments, isPending, error } = hookResult();
  const router = useRouter();
  // console.log('appointments', appointments?.data)
  const handleAppointmentPress = useCallback(
    (appointment: Appointment) => router.push(`/appointments/${appointment.id}`),
    [router]
  );

  const { upcoming, history } = useMemo(
    () => {
      const result = sectionAppointments(appointments?.data);
      return result;
    },
    [appointments?.data]
  );

  // Show loading state
  if (isPending) {
    return (
      <SafeAreaView className='flex-1 bg-white'>
        <ProfileHeader title='Appointments' showNotification={false} showCurrency={true} showBackArrow={true} />
        <View className="mt-2 px-4">
          <LoadingSkeleton count={6} />
        </View>
      </SafeAreaView>
    );
  }

  // Show error state
  if (error) {
    return (
      <SafeAreaView className='flex-1 bg-white'>
        <ProfileHeader title='Appointments' showNotification={false} showCurrency={true} showBackArrow={true} />
        <View className="flex-1 justify-center items-center mt-20 px-4">
          <Text className="text-red-500 text-center text-lg font-semibold mb-2">
            Error Loading Appointments
          </Text>
          <Text className="text-zinc-500 text-center">
            {error.message || "Something went wrong. Please try again later."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ProfileHeader title='Appointments' showNotification={false} showCurrency={true} showBackArrow={true} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Upcoming Appointments */}
        {upcoming.length > 0 && (
          <View className="px-4 mt-3">
            <Text className="text-lg font-bold mb-3">Upcoming</Text>
            {upcoming.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                type="upcoming"
                appointment={appointment}
                onPress={() => handleAppointmentPress(appointment)}
                noMargin
              />
            ))}
          </View>
        )}

        {/* History Appointments */}
        {history.length > 0 && (
          <View className="px-4 mt-4">
            <Text className="text-lg font-bold mb-3">History</Text>
            {history.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                type="history"
                appointment={appointment}
                onPress={() => handleAppointmentPress(appointment)}
                noMargin
              />
            ))}
          </View>
        )}

        {/* Empty State */}
        {upcoming.length === 0 && history.length === 0 && (
          <View className="justify-center items-center mt-20 px-4">
            <Text className="text-zinc-500 text-center py-12">
              No appointments found
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}