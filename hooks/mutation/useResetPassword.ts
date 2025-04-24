import { SIGN_IN } from "@/constants/routes"
import { ResetPasswordPayload } from "@/constants/types"
import api from "@/lib/api"
import { useSignupStore } from "@/store/signup-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { Alert } from "react-native"

const useResetPassword = () => {
  const queryClient = useQueryClient()
  const clearJwtToken = useSignupStore((state) => state.clearJwtToken)

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ResetPasswordPayload) => api.post(`/eserve-one/reset-password`, payload),
    onSuccess: (data) => {
      if (data) {
        console.log("Success response:", data?.data)
        clearJwtToken()
        router.push(SIGN_IN)
        queryClient.invalidateQueries({ queryKey: ["user"] })
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      console.log('error', error.response.data.description)
      Alert.alert('Error', error.response.data.description)
    }
  })

  const handleResetPassword = (payload: ResetPasswordPayload) => {
    mutate(payload)
  }

  return { handleResetPassword, isPending }
}

export default useResetPassword