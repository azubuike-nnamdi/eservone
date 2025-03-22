import { SIGN_IN } from "@/constants/routes"
import { SignUpPayload } from "@/constants/types"
import { useAuth } from "@/context/auth-context"
import api, { baseURL } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { router } from "expo-router"
import { Alert } from "react-native"


const useSignUpMutate = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignUpPayload) => {
      return api.post(`/eserve-one/sign-up`, payload)
    },
    onSuccess: (data) => {
      if (data) {
        console.log('success', data)
        router.push(SIGN_IN)
        queryClient.setQueryData(["user"], data)
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      console.log('error', error.response.data.description)
      Alert.alert('Error', error.response.data.description)
    }
  })

  const handleSignUp = (payload: SignUpPayload) => {
    mutate(payload)
  }

  return { handleSignUp, isPending }
}

export default useSignUpMutate

