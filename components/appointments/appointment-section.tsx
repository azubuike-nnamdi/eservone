import { AppointmentSectionProps } from "@/constants/types"
import { FlatList, Text, View } from "react-native"
import AppointmentCard from "./appointment-card"

export default function AppointmentSection({ title, type, appointments, onAppointmentPress }: AppointmentSectionProps) {
  if (appointments.length === 0) {
    return null
  }

  return (
    <View className="mb-6">
      <Text className="text-lg font-bold mb-4">{title}</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AppointmentCard
            type={type}
            appointment={item}
            onPress={() => onAppointmentPress?.(item)}
          />
        )}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
