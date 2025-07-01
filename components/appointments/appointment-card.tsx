import { Text, View } from "react-native";

import { AppointmentCardProps } from "@/constants/types";
import Entypo from '@expo/vector-icons/Entypo';
import { TouchableOpacity } from "react-native";

export default function AppointmentCard({
  type,
  appointment,
  onPress,
}: AppointmentCardProps) {
  const isUpcoming = type === "upcoming";

  // Format the appointment date and time
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

  // Get service name based on serviceId or use a default
  const getServiceName = () => {
    if (appointment.serviceId) {
      return `Service #${appointment.serviceId}`;
    }
    return "General Service";
  };

  // Get location from address or use default
  const getLocation = () => {
    return appointment.address || "Location not specified";
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row mb-4 border border-gray-100 rounded-lg overflow-hidden"
      activeOpacity={0.7}
    >
      {/* Date and time section */}
      <View className="bg-gray-100 p-4 justify-center items-center w-24">
        <Text className="text-gray-500 font-medium">{formatDate(appointment.appointmentDate)}</Text>
        <Text className="text-gray-400 text-xs">{formatTime(appointment.appointmentDate)}</Text>
      </View>

      {/* Appointment details section */}
      <View className="flex-1 p-4 justify-center">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="font-medium text-base">{getServiceName()}</Text>
            <Text className="text-gray-500 text-sm">{getLocation()}</Text>
            <Text className="text-gray-500 text-sm mt-1">Cost: ${appointment.costOfService}</Text>
          </View>

          {isUpcoming ? (
            <Entypo name="chevron-right" size={20} color="#000" />
          ) : (
            <View className="items-end">
              <Text className={`text-xs font-medium ${appointment.serviceStatus === 'COMPLETED' ? 'text-green-600' : 'text-red-600'
                }`}>
                {appointment.serviceStatus}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}