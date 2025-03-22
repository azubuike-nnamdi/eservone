import { CONTINUE_SIGN_UP } from "@/constants/routes"
import type { VerificationPayload } from "@/constants/types"
import api from "@/lib/api"
import { useAuth } from "@/context/auth-context"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"

const ValidateEmail = () => {
  const queryClient = useQueryClient()
  const { saveToken } = useAuth()

  const mutation = useMutation({
    mutationFn: (payload: VerificationPayload) => {
      return api.post(`/eserve-one/verify-email`, payload)
    },
    onSuccess: ({ data }) => {
      if (data) {
        router.push(CONTINUE_SIGN_UP)
        queryClient.invalidateQueries({ queryKey: ["user"] })

        //store jwt token using auth context
        saveToken(data?.data?.jwtToken)
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

