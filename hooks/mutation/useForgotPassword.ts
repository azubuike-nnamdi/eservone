import { ForgotPasswordPayload } from "@/constants/types"
import { useMutation } from "@tanstack/react-query"
import api from "@/lib/api"
import { router } from "expo-router"
import { FORGOT_PASSWORD, RESET_PASSWORD, VERIFY_EMAIL } from "@/constants/routes"
import { Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"


const useForgotPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => {
      return api.post(`/eserve-one/forgot-password`, payload)
    },
    onSuccess: async (data) => {
      if (data) {
        await Promise.all([
          AsyncStorage.setItem('requestId', data?.data?.data?.requestId),
          AsyncStorage.setItem('flow_type', 'forgot_password')
        ]);
        router.push(VERIFY_EMAIL)
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      console.log('error', error.response.data.description)
      Alert.alert('Error', error.response.data.description)
    }
  })

  const handleForgotPassword = (payload: ForgotPasswordPayload) => {
    mutate(payload)
  }

  return { handleForgotPassword, isPending }
}

export default useForgotPassword