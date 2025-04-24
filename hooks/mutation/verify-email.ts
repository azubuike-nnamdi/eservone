import { CONTINUE_SIGN_UP } from "@/constants/routes"
import type { VerificationPayload } from "@/constants/types"
import api from "@/lib/api"
import { useSignupStore } from "@/store/signup-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"

const ValidateEmail = () => {
  const queryClient = useQueryClient()
  const setJwtToken = useSignupStore((state) => state.setJwtToken)

  const mutation = useMutation({
    mutationFn: (payload: VerificationPayload) => {
      return api.post(`/eserve-one/verify-email`, payload)
    },
    onSuccess: ({ data }) => {
      console.log("Success response:", data?.data)
      if (data) {
        console.log("Storing JWT Token:", data?.data?.jwtToken);
        router.push(CONTINUE_SIGN_UP)
        queryClient.invalidateQueries({ queryKey: ["user"] })

        //store jwt token using signup store
        setJwtToken(data?.data?.jwtToken)
        console.log("JWT Token stored in signup store");
      }
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.description || "An error occurred while verifying OTP"
      console.log("OTP verification error:", errorMsg)
      throw new Error(errorMsg)
    },
  })

  const handleValidateEmail = async (payload: VerificationPayload) => {
    try {
      await mutation.mutateAsync(payload)
    } catch (error) {
      console.log("Mutation error caught:", error)
      throw error
    }
  }

  return { handleValidateEmail, isPending: mutation.isPending, data: mutation.data, error: mutation.error }
}

export default ValidateEmail

