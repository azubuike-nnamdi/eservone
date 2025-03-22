import { SIGN_IN } from "@/constants/routes"
import { ChangePasswordPayload } from "@/constants/types"
import api from "@/lib/api"
import { useMutation } from "@tanstack/react-query"
import { router } from "expo-router"
import { Alert } from "react-native"

const useChangePassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ChangePasswordPayload) => {
      return api.post(`/eserve-one/change-password`, payload)
    },
    onSuccess: (data) => {
      if (data) {
        router.push(SIGN_IN)
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      console.log('error', error.response.data.description)
      Alert.alert('Error', error.response.data.description ?? 'Something went wrong')
    }
  })

  const handleChangePassword = (payload: ChangePasswordPayload) => {
    mutate(payload)
  }

  return { handleChangePassword, isPending }
}

export default useChangePassword