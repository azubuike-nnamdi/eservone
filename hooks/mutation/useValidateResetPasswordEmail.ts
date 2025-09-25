import { RESET_PASSWORD } from "@/constants/routes"
import { ValidateResetPasswordEmailPayload } from "@/constants/types"
import { api } from "@/lib/api"
import { useSignupStore } from "@/store/signup-store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { Alert } from "react-native"

const useValidateResetPasswordEmail = () => {
  const queryClient = useQueryClient()
  const setJwtToken = useSignupStore((state) => state.setJwtToken)

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ValidateResetPasswordEmailPayload) => {
      return api.post(`/eserve-one/validate-reset-password-email`, payload)
    },
    onSuccess: async ({ data }) => {
      if (data) {
        // Clear verification data from AsyncStorage
        try {
          await AsyncStorage.multiRemove(['verify_email', 'requestId', 'forgot_password_email', 'flow_type']);
        } catch (error) {
          console.error("Error clearing verification data:", error);
        }

        queryClient.invalidateQueries({ queryKey: ["user"] })
        // console.log("OTP Validation Success, saving token:", data?.data?.jwtToken)
        setJwtToken(data?.data?.jwtToken)
        router.push(RESET_PASSWORD)
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {

      Alert.alert('Error', error.response.data.description)
    }
  })

  const handleValidateResetPasswordEmail = (payload: ValidateResetPasswordEmailPayload) => {
    mutate(payload)
  }

  return { isPending, handleValidateResetPasswordEmail }
}

export default useValidateResetPasswordEmail