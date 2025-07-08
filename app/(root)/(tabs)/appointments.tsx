import AppointmentCard from "@/components/appointments/appointment-card";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ProfileHeader from "@/components/common/profile-header";
import { Appointment } from "@/constants/types";
import useGetAppointmentByUserId from "@/hooks/query/useGetAppointmentByUserId";
import useGetProviderAppointments from "@/hooks/query/useGetProviderAppointments";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define the data structure for FlatList
type FlatListData = {
  type: 'section' | 'appointment';
  title?: string;
  appointmentType?: 'upcoming' | 'history';
  appointment?: Appointment;
  onPress?: (appointment: Appointment) => void;
};

export default function Appointments() {

  const user = useAuthStore((state) => state.user);
  const hookResult = user?.userRole === 'SERVICE_SEEKER' ? useGetAppointmentByUserId : useGetProviderAppointments;
  const { data: appointments, isPending, error } = hookResult();
  const router = useRouter();

  // Section appointments based on status
  const { upcomingAppointments, historyAppointments } = useMemo(() => {
    if (!appointments?.data) {
      return { upcomingAppointments: [], historyAppointments: [] };
    }

    const upcoming: Appointment[] = [];
    const history: Appointment[] = [];

    appointments.data.forEach((appointment: Appointment) => {
      if (appointment.serviceStatus === 'PENDING') {
        upcoming.push(appointment);
      } else if (appointment.serviceStatus === 'COMPLETED' || appointment.serviceStatus === 'CANCELED') {
        history.push(appointment);
      }
    });

    return { upcomingAppointments: upcoming, historyAppointments: history };
  }, [appointments?.data]);

  const handleUpcomingAppointmentPress = useCallback((appointment: Appointment) => {
    router.push(`/appointments/${appointment.id}`);
  }, [router]);

  const handleHistoryAppointmentPress = useCallback((appointment: Appointment) => {
    router.push(`/appointments/${appointment.id}`);
  }, [router]);

  // Create FlatList data with sections and appointments
  const flatListData: FlatListData[] = useMemo(() => {
    const data: FlatListData[] = [];

    // Add upcoming section if there are upcoming appointments
    if (upcomingAppointments.length > 0) {
      data.push({
        type: 'section',
        title: 'Upcoming',
        appointmentType: 'upcoming'
      });

      upcomingAppointments.forEach(appointment => {
        data.push({
          type: 'appointment',
          appointmentType: 'upcoming',
          appointment,
          onPress: handleUpcomingAppointmentPress
        });
      });
    }

    // Add history section if there are history appointments
    if (historyAppointments.length > 0) {
      data.push({
        type: 'section',
        title: 'History',
        appointmentType: 'history'
      });

      historyAppointments.forEach(appointment => {
        data.push({
          type: 'appointment',
          appointmentType: 'history',
          appointment,
          onPress: handleHistoryAppointmentPress
        });
      });
    }

    return data;
  }, [upcomingAppointments, historyAppointments, handleUpcomingAppointmentPress, handleHistoryAppointmentPress]);

  const renderItem = useCallback(({ item }: { item: FlatListData }) => {
    if (item.type === 'section') {
      return (
        <View className="px-7 mt-6 mb-4">
          <Text className="text-lg font-bold">{item.title}</Text>
        </View>
      );
    }

    if (item.type === 'appointment' && item.appointment && item.appointmentType) {
      return (
        <View className="px-7 mb-4">
          <AppointmentCard
            type={item.appointmentType}
            appointment={item.appointment}
            onPress={() => item.onPress?.(item.appointment!)}
          />
        </View>
      );
    }

    return null;
  }, []);

  const keyExtractor = useCallback((item: FlatListData, index: number) => {
    if (item.type === 'section') {
      return `section-${item.title}-${index}`;
    }
    return `appointment-${item.appointment?.id}-${index}`;
  }, []);

  // Show loading state
  if (isPending) {
    return (
      <SafeAreaView className='flex-1 bg-white'>
        <ProfileHeader title='Appointments' showNotification={false} showCurrency={true} showBackArrow={true} />
        <View className="mt-6 px-7">
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

      <FlatList
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-20 px-4">
            <Text className="text-zinc-500 text-center">
              No appointments found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}