
import { CreateRatingPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

const useCreateRating = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: CreateRatingPayload) => api.post(`/eserve-one/create-ratings`, payload),
    onSuccess: async (data) => {
      if (data) {
        showToast(data?.data?.description, "success")
        router.back()
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description ?? "Failed to create rating", "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["rating"] })
    }
  })

  const handleCreateRating = (payload: CreateRatingPayload) => {

    mutate(payload)
  }

  return { handleCreateRating, isPending }
}

export default useCreateRating