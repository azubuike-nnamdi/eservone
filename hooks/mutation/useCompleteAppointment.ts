import { CompleteAppointmentPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Alert } from "react-native"

const useCompleteAppointment = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CompleteAppointmentPayload) => api.post(`/eserve-one/completed-appointment`, payload),
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

  const handleCompleteAppointment = (payload: CompleteAppointmentPayload) => {

    mutate(payload)
  }

  return { handleCompleteAppointment, isPending }
}

export default useCompleteAppointment