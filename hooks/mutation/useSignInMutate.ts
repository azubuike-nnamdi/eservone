import { HOME } from "@/constants/routes"
import { SignInPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { baseURL } from "@/lib/api"
import { useAuthStore } from "@/store/auth-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { router } from "expo-router"

const useSignInMutate = () => {
  const queryClient = useQueryClient()
  const setAuth = useAuthStore((state) => state.setAuth)
  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignInPayload) => axios.post(`${baseURL}/eserve-one/user-login`, payload),
    onSuccess: async (data) => {
      if (data) {
        console.log('Sign in success:', data?.data?.data)
        try {
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
            }
          )
          queryClient.invalidateQueries({ queryKey: ["user"] })
          queryClient.setQueryData(["user"], data)
          console.log('Auth data saved, navigating to home', data?.data?.data)

          router.push(HOME)
        } catch (error) {
          console.error('Error saving auth data:', error)
          showToast("Failed to save authentication data", "error")
        }
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error.response.data.description || "An error occurred during sign in", "error")
    }
  })

  const handleSignIn = (payload: SignInPayload) => {
    mutate(payload)
  }

  return { handleSignIn, isPending }
}

export default useSignInMutate