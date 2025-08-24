import { CompleteAppointmentPayload } from "@/constants/types"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Alert } from "react-native"

const useSeekerCompleteAppointment = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CompleteAppointmentPayload) => api.post(`/eserve-one/seeker-complete-service`, payload),
    onSuccess: async (data) => {
      if (data) {
        Alert.alert(data?.data?.description, "Success")
        router.back()
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      Alert.alert(error?.response?.data?.description ?? "Failed to complete appointment", "Error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    }
  })

  const handleSeekerCompleteAppointment = (payload: CompleteAppointmentPayload) => {

    mutate(payload)
  }

  return { handleSeekerCompleteAppointment, isPending }
}

export default useSeekerCompleteAppointment