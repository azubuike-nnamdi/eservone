import { CompleteAppointmentPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

const useCompleteAppointment = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CompleteAppointmentPayload) => api.post(`/eserve-one/completed-appointment`, payload),
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

  const handleCompleteAppointment = (payload: CompleteAppointmentPayload) => {

    mutate(payload)
  }

  return { handleCompleteAppointment, isPending }
}

export default useCompleteAppointment