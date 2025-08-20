
import { AcceptBookingPayload } from "@/constants/types"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Alert } from "react-native"

const useAcceptBooking = () => {
  const router = useRouter()
  const queryClient = useQueryClient()


  const { mutate, isPending } = useMutation({
    mutationFn: (payload: AcceptBookingPayload) => api.post(`/eserve-one/accept-appointment`, payload),
    onSuccess: async (data) => {
      if (data) {
        Alert.alert(data?.data?.description)
        router.back()
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      Alert.alert(error?.response?.data?.description ?? "Failed to create review")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    }
  })

  const handleAcceptBooking = (payload: AcceptBookingPayload) => {

    mutate(payload)
  }

  return { handleAcceptBooking, isPending }
}

export default useAcceptBooking