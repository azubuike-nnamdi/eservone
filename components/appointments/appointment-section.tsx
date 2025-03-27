import { AppointmentSectionProps } from "@/constants/types"
import { Text, View } from "react-native"
import AppointmentCard from "./appointment-card"

export default function AppointmentSection({ title, type, appointments, onAppointmentPress }: AppointmentSectionProps) {
  if (appointments.length === 0) {
    return null
  }

  return (
    <View className="mb-6">
      <Text className="text-lg font-bold mb-4">{title}</Text>
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          type={type}
          date={appointment.date}
          time={appointment.time}
          serviceName={appointment.serviceName}
          location={appointment.location}
          price={appointment.price}
          rating={appointment.rating}
          onPress={() => onAppointmentPress?.(appointment)}
        />
      ))}
    </View>
  )
}
