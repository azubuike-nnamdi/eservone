import { Text, View } from "react-native"

import { AppointmentCardProps } from "@/constants/types"
import { TouchableOpacity } from "react-native"
import { ChevronRight, Star } from "lucide-react-native"

export default function AppointmentCard({
  type,
  date,
  time,
  serviceName,
  location,
  price,
  rating,
  onPress,
}: AppointmentCardProps) {
  const isUpcoming = type === "upcoming"

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row mb-4 border border-gray-100 rounded-lg overflow-hidden"
      activeOpacity={0.7}
    >
      {/* Date and time section */}
      <View className="bg-gray-100 p-4 justify-center items-center w-24">
        <Text className="text-gray-500 font-medium">{date}</Text>
        <Text className="text-gray-400 text-xs">{time}</Text>
      </View>

      {/* Appointment details section */}
      <View className="flex-1 p-4 justify-center">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="font-medium text-base">{serviceName}</Text>
            <Text className="text-gray-500 text-sm">{location}</Text>
            <Text className="text-gray-500 text-sm mt-1">Price: ${price.toFixed(2)}</Text>
          </View>

          {isUpcoming ? (
            <ChevronRight size={20} color="#000" />
          ) : rating ? (
            <View className="flex-row items-center">
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text className="ml-1 text-sm">{rating.toFixed(1)}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  )
}