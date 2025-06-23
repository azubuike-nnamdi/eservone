import { IDENTIFICATION_CONFIRMATION } from "@/constants/routes"
import { UpdateProfilePayload } from "@/constants/types"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { Alert } from "react-native"

const useUpdateProfile = () => {

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => {
      return api.post(`/eserve-one/update-profile`, payload)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["user"] })
        queryClient.setQueryData(["user"], data)
        router.push(IDENTIFICATION_CONFIRMATION)
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      Alert.alert('Error', error.response.data.description)
    }
  })

  const handleUpdateProfile = (payload: UpdateProfilePayload) => {
    mutate(payload)
  }

  return { handleUpdateProfile, isPending }
}

export default useUpdateProfile