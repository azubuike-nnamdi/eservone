import { PROFILE } from "@/constants/routes"
import { UpdateProfilePayload } from "@/constants/types"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { Alert } from "react-native"

const useUpdateProfile = () => {

  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => {
      return api.post(`/eserve-one/update-profile`, payload)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["user"] })
        queryClient.setQueryData(["user"], data)
        Alert.alert('Profile document submitted for verification', 'You will be notified once your document is verified')
        router.push(PROFILE as any)
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      Alert.alert('Error', error.response.data.description)
    }
  })

  const handleUpdateProfile = (payload: UpdateProfilePayload) => {
    mutate(payload)
  }

  return { handleUpdateProfile, isPending, isSuccess }
}

export default useUpdateProfile