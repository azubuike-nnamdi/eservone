import { VERIFY_EMAIL } from "@/constants/routes"
import { ForgotPasswordPayload } from "@/constants/types"
import api from "@/lib/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { Alert } from "react-native"


const useForgotPassword = () => {
  const queryClient = useQueryClient()
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
        queryClient.invalidateQueries({ queryKey: ["user"] })
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