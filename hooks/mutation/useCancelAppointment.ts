import { CancelAppointmentPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

const useCancelAppointment = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CancelAppointmentPayload) => api.post(`/eserve-one/cancel-appointment`, payload),
    onSuccess: async (data) => {
      if (data) {
        showToast(data?.data?.description, "success")
        router.back()
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description ?? "Failed to book appointment", "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    }
  })

  const handleCancelAppointment = (payload: CancelAppointmentPayload) => {

    mutate(payload)
  }

  return { handleCancelAppointment, isPending }
}

export default useCancelAppointment