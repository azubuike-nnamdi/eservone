import { ChangePasswordPayload } from "@/constants/types"
import api from "@/lib/api"
import { useAuthStore } from "@/store/auth-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Alert } from "react-native"

const useChangePassword = () => {
  const queryClient = useQueryClient()
  const { clearAuth } = useAuthStore()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (payload: ChangePasswordPayload) => {
      return api.post(`/eserve-one/change-password`, payload)
    },
    onSuccess: (data) => {
      if (data) {
        Alert.alert('Success', data?.data?.description)
      }
      clearAuth()
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
    onError: (error: { response: { data: { description: string } } }) => {
      console.log('error', error.response.data.description)
      Alert.alert('Error', error.response.data.description ?? 'Something went wrong')
    }
  })

  const handleChangePassword = (payload: ChangePasswordPayload) => {
    mutate(payload)
  }

  return { handleChangePassword, isPending, isSuccess }
}

export default useChangePassword