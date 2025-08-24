import { UpdateUserBioPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"

const useUpdateUserBio = () => {

  const { showToast } = useToast()

  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (payload: UpdateUserBioPayload) => {
      return api.post(`/eserve-one/update-user-profile`, payload)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["user"] })
        queryClient.setQueryData(["user"], data)
        router.back()
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error.response.data.description, "error")
    }
  })

  const handleUpdateUserBio = (payload: UpdateUserBioPayload) => {
    mutate(payload)
  }

  return { handleUpdateUserBio, isPending, isSuccess }
}

export default useUpdateUserBio