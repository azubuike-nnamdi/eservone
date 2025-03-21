import { CONTINUE_SIGN_UP } from "@/constants/routes"
import type { VerificationPayload } from "@/constants/types"
import api, { baseURL } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"

const ValidateEmail = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (payload: VerificationPayload) => {
      return api.post(`/eserve-one/verify-email`, payload)
    },
    onSuccess: ({ data }) => {
      console.log("Success response:", data)
      if (data) {
        router.push(CONTINUE_SIGN_UP)
        queryClient.invalidateQueries({ queryKey: ["user"] })
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

