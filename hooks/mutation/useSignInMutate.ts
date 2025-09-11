import { HOME } from "@/constants/routes"
import { SignInPayload } from "@/constants/types"
import { baseURL } from "@/lib/api"
import { useAuthStore } from "@/store/auth-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { router } from "expo-router"
import { Alert } from "react-native"

const useSignInMutate = () => {
  const queryClient = useQueryClient()
  const setAuth = useAuthStore((state) => state.setAuth)

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignInPayload) => axios.post(`${baseURL}/eserve-one/user-login`, payload),
    onSuccess: async (data) => {
      // console.log("data", data?.data?.data)
      if (data) {
        // Store auth data in Zustand store
        setAuth(
          data?.data?.data?.jwtToken,
          data?.data?.data?.refreshToken,
          {
            email: data?.data?.data?.email,
            firstName: data?.data?.data?.firstName,
            lastName: data?.data?.data?.lastName,
            userRole: data?.data?.data?.role,
            country: data?.data?.data?.country,
            isBusiness: data?.data?.data?.isBusiness,
            isIndustryCertificateVerified: data?.data?.data?.isIndustryCertificateVerified,
          }
        )
        queryClient.invalidateQueries({ queryKey: ["user"] })
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