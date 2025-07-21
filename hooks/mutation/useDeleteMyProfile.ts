
import { AcceptBookingPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

const useDeleteMyProfile = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: AcceptBookingPayload) => api.post(`/eserve-one/delete-user`, payload),
    onSuccess: async (data) => {
      if (data) {
        showToast(data?.data?.description, "success")
        router.back()
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description ?? "Failed to create review", "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    }
  })

  const handleDeleteBooking = (payload: AcceptBookingPayload) => {

    mutate(payload)
  }

  return { handleDeleteBooking, isPending }
}

export default useDeleteMyProfile