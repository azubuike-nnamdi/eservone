import { SIGN_IN } from "@/constants/routes"
import { SignUpPayload } from "@/constants/types"
import { api } from "@/lib/api"
import { useSignupStore } from "@/store/signup-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"
import { Alert } from "react-native"


const useSignUpMutate = () => {
  const queryClient = useQueryClient()
  const clearJwtToken = useSignupStore((state) => state.clearJwtToken)
  const jwtToken = useSignupStore((state) => state.jwtToken)

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignUpPayload) => {
      console.log('Signup Mutation - Current JWT Token:', jwtToken);
      return api.post(`/eserve-one/sign-up`, payload)
    },
    onSuccess: (data) => {
      if (data) {
        console.log('success', data)
        router.push(SIGN_IN)
        queryClient.invalidateQueries({ queryKey: ["user"] })
        queryClient.setQueryData(["user"], data)
        clearJwtToken()
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

