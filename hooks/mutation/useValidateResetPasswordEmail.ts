import { ValidateResetPasswordEmailPayload } from "@/constants/types"
import api from "@/lib/api"
import { useMutation } from "@tanstack/react-query"
import { Alert } from "react-native"
import { router } from "expo-router"
import { RESET_PASSWORD } from "@/constants/routes"
import { useAuth } from "@/context/auth-context"

const useValidateResetPasswordEmail = () => {
  const { saveToken } = useAuth()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ValidateResetPasswordEmailPayload) => api.post(`eserve-one/validate-reset-password-email`, payload),
    onSuccess: (data) => {
      saveToken(data?.data?.data?.jwtToken)
      router.push(RESET_PASSWORD)
    },
    onError: (error: { response: { data: { description: string } } }) => {
      Alert.alert('Error', error.response.data.description)
    }
  })

  const handleValidateResetPasswordEmail = (payload: ValidateResetPasswordEmailPayload) => {
    mutate(payload)
  }

  return { mutate, isPending, handleValidateResetPasswordEmail }
}

export default useValidateResetPasswordEmail