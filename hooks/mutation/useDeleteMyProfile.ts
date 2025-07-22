
import { SIGN_IN } from "@/constants/routes"
import { AcceptBookingPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useAuthStore } from "@/store/auth-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

const useDeleteMyProfile = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { clearAuth } = useAuthStore()

  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: AcceptBookingPayload) => api.post(`/eserve-one/delete-user`, payload),
    onSuccess: async (data) => {
      if (data) {
        showToast(data?.data?.description, "success")
        clearAuth()
        router.replace(SIGN_IN)
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description ?? "Failed to create review", "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    }
  })

  const handleDeleteBooking = (payload: AcceptBookingPayload) => {

    mutate(payload)
  }

  return { handleDeleteBooking, isPending }
}

export default useDeleteMyProfile