
import { createReviewPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

const useSubmitReview = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: createReviewPayload) => api.post(`/eserve-one/create-review`, payload),
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
      queryClient.invalidateQueries({ queryKey: ["rating"] })
    }
  })

  const handleCreateRating = (payload: createReviewPayload) => {

    mutate(payload)
  }

  return { handleCreateRating, isPending }
}

export default useSubmitReview