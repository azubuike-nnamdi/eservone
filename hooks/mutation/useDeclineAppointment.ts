import { DeclineAppointmentPayload } from "@/constants/types"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Alert } from "react-native"

const useDeclineAppointment = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: DeclineAppointmentPayload) => api.post(`/eserve-one/decline-appointment`, payload),
    onSuccess: async (data) => {
      if (data) {
        Alert.alert(data?.data?.description)
        router.back()
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      Alert.alert(error?.response?.data?.description ?? "Failed to book appointment")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    }
  })

  const handleDeclineAppointment = (payload: DeclineAppointmentPayload) => {

    mutate(payload)
  }

  return { handleDeclineAppointment, isPending }
}

export default useDeclineAppointment