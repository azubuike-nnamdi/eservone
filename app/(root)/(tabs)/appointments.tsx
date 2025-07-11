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

// Helper to section appointments
function sectionAppointments(appointments: Appointment[] = []) {
  const upcoming: Appointment[] = [];
  const history: Appointment[] = [];
  appointments.forEach((appointment) => {
    if (appointment.serviceStatus === 'PENDING') {
      upcoming.push(appointment);
    } else if (["COMPLETED", "CANCELED"].includes(appointment.serviceStatus)) {
      history.push(appointment);
    }
  });
  return { upcoming, history };
}

// Helper to build FlatList data
function buildFlatListData(
  upcoming: Appointment[],
  history: Appointment[],
  onPress: (appointment: Appointment) => void
): FlatListData[] {
  const data: FlatListData[] = [];
  if (upcoming.length) {
    data.push({ type: 'section' as const, title: 'Upcoming', appointmentType: 'upcoming' });
    data.push(...upcoming.map((appointment) => ({
      type: 'appointment' as const,
      appointmentType: 'upcoming' as const,
      appointment,
      onPress,
    })));
  }
  if (history.length) {
    data.push({ type: 'section' as const, title: 'History', appointmentType: 'history' });
    data.push(...history.map((appointment) => ({
      type: 'appointment' as const,
      appointmentType: 'history' as const,
      appointment,
      onPress,
    })));
  }
  return data;
}

export default function Appointments() {

  const user = useAuthStore((state) => state.user);
  const hookResult = user?.userRole === 'SERVICE_SEEKER' ? useGetAppointmentByUserId : useGetProviderAppointments;
  const { data: appointments, isPending, error } = hookResult();
  const router = useRouter();

  const handleAppointmentPress = useCallback(
    (appointment: Appointment) => router.push(`/appointments/${appointment.id}`),
    [router]
  );

  const { upcoming, history } = useMemo(
    () => sectionAppointments(appointments?.data),
    [appointments?.data]
  );

  const flatListData = useMemo(
    () => buildFlatListData(upcoming, history, handleAppointmentPress),
    [upcoming, history, handleAppointmentPress]
  );

  const renderItem = useCallback(({ item }: { item: FlatListData }) => {
    if (item.type === 'section') {
      return (
        <View className="px-7 mt-3 mb-2">
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

  const keyExtractor = useCallback(
    (item: FlatListData, index: number) =>
      item.type === 'section'
        ? `section-${item.title}-${index}`
        : `appointment-${item.appointment?.id}-${index}`,
    []
  );

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
          <View className="justify-center items-center mt-2x px-4">
            <Text className="text-zinc-500 text-center">
              No appointments found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}