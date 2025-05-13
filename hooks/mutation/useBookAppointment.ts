import { BookAppointmentPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import api from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

const useBookAppointment = () => {

  const queryClient = useQueryClient()

  const router = useRouter()
  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: BookAppointmentPayload) => api.post(`/eserve-one/create-service-appointment`, payload),
    onSuccess: (data) => {
      if (data) {
        showToast(data?.data?.description, "success")
        queryClient.invalidateQueries({ queryKey: ["booked-appointments"] })
        router.push("/(tabs)/messages" as any)
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description ?? "Failed to book appointment", "error")
    }
  })

  const handleBookAppointment = (payload: BookAppointmentPayload) => {
    mutate(payload)
  }

  return { handleBookAppointment, isPending }
}

export default useBookAppointment