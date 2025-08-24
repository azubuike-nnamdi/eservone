import { CompleteAppointmentPayload } from "@/constants/types"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Alert } from "react-native"

const useProviderCompleteAppointment = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CompleteAppointmentPayload) => api.post(`/eserve-one/provider-complete-service`, payload),
    onSuccess: async (data) => {
      if (data) {
        Alert.alert("Success", data?.data?.description)
        router.back()
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      Alert.alert("Error", error?.response?.data?.description ?? "Failed to complete appointment",)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    }
  })

  const handleProviderCompleteAppointment = (payload: CompleteAppointmentPayload) => {

    mutate(payload)
  }

  return { handleProviderCompleteAppointment, isPending }
}

export default useProviderCompleteAppointment