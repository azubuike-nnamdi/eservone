import { Text, TouchableOpacity, View } from "react-native";

interface Appointment {
  id: number;
  appointmentDate: string;
  address: string | null;
  costOfService: string;
  upfrontPayment: string;
  buzzCode: string;
  additionalDetails: string;
  hasPet: boolean;
  serviceId: number | null;
  price: number | null;
  userId: string;
}

interface AppointmentItemProps {
  appointment: Appointment;
  onPress: () => void;
}

export const AppointmentItem = ({ appointment, onPress }: AppointmentItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <TouchableOpacity
      className="flex-row items-center px-4 py-3 border-b border-zinc-100"
      onPress={onPress}
    >
      <View className="w-12 h-12 rounded-full bg-blue-100 mr-3 items-center justify-center">
        <Text className="text-xl text-blue-600">📅</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-base text-zinc-800">
            Appointment #{appointment.id}
          </Text>
          <Text className="text-xs text-zinc-400">
            {formatDate(appointment.appointmentDate)}
          </Text>
        </View>
        <Text className="text-zinc-500 text-sm mt-0.5">
          {formatTime(appointment.appointmentDate)} • ${appointment.costOfService}
        </Text>
        {appointment.address && (
          <Text className="text-zinc-400 text-xs mt-0.5" numberOfLines={1}>
            📍 {appointment.address}
          </Text>
        )}
        {appointment.additionalDetails && (
          <Text className="text-zinc-400 text-xs mt-0.5" numberOfLines={1}>
            📝 {appointment.additionalDetails}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}; 