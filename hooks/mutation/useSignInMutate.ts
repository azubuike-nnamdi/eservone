import { HOME } from "@/constants/routes"
import { SignInPayload } from "@/constants/types"
import { useAuth } from "@/context/auth-context"
import { useUser } from "@/context/user-context"
import api, { baseURL } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { router } from "expo-router"
import { Alert } from "react-native"

const useSignInMutate = () => {
  const queryClient = useQueryClient()
  const { saveToken } = useAuth()
  const { saveUser } = useUser()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignInPayload) => axios.post(`${baseURL}/eserve-one/user-login`, payload),
    onSuccess: (data) => {
      if (data) {
        console.log(data?.data?.data)
        //store jwt token using auth context
        saveToken(data?.data?.data?.token)
        //store user info using user context
        saveUser({
          email: data?.data?.data?.email,
          firstName: data?.data?.data?.firstName,
          userRole: data?.data?.data?.role,
        })
        queryClient.setQueryData(["user"], data)
        router.push(HOME)
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      Alert.alert('Error', error.response.data.description)
    }
  })

  const handleSignIn = (payload: SignInPayload) => {
    mutate(payload)
  }

  return { handleSignIn, isPending }
}

export default useSignInMutate