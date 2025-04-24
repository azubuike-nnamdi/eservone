import { ResetPasswordPayload } from "@/constants/types"
import api from "@/lib/api"
import { useMutation } from "@tanstack/react-query"
import { router } from "expo-router"
import { SIGN_IN } from "@/constants/routes"
import { Alert } from "react-native"

const useResetPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ResetPasswordPayload) => api.post(`/eserve-one/reset-password`, payload),
    onSuccess: (data) => {
      if (data) {
        console.log("Success response:", data?.data)
        router.push(SIGN_IN)
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