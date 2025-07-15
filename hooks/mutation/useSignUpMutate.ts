import { SIGN_IN } from "@/constants/routes"
import { SignUpPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useOnboardingStore } from "@/store/onboarding-store"
import { useSignupStore } from "@/store/signup-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"


const useSignUpMutate = () => {
  const queryClient = useQueryClient()
  const clearJwtToken = useSignupStore((state) => state.clearJwtToken)
  const { resetOnboarding } = useOnboardingStore()
  // const jwtToken = useSignupStore((state) => state.jwtToken)
  const { showToast } = useToast()
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignUpPayload) => {

      return api.post(`/eserve-one/sign-up`, payload)
    },
    onSuccess: (data) => {
      if (data) {

        router.push(SIGN_IN)
        queryClient.invalidateQueries({ queryKey: ["user"] })
        queryClient.setQueryData(["user"], data)
        clearJwtToken()
        resetOnboarding();
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error.response.data.description, "error")
    }
  })

  const handleSignUp = (payload: SignUpPayload) => {
    mutate(payload)
  }

  return { handleSignUp, isPending }
}

export default useSignUpMutate

