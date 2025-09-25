import { CONTINUE_SIGN_UP } from "@/constants/routes"
import type { VerificationPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useSignupStore } from "@/store/signup-store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { router } from "expo-router"

const ValidateEmail = () => {
  const queryClient = useQueryClient()
  const setJwtToken = useSignupStore((state) => state.setJwtToken)
  const { showToast } = useToast()

  const mutation = useMutation({
    mutationFn: (payload: VerificationPayload) => {
      return api.post(`/eserve-one/verify-email`, payload)
    },
    onSuccess: async ({ data }) => {
      if (data) {
        // Clear verification data from AsyncStorage
        try {
          await AsyncStorage.multiRemove(['verify_email', 'requestId', 'forgot_password_email', 'flow_type']);
        } catch (error) {
          console.error("Error clearing verification data:", error);
        }

        // console.log("Storing JWT Token:", data?.data?.jwtToken);
        showToast("Email verified successfully", "success")
        router.push(CONTINUE_SIGN_UP)
        queryClient.invalidateQueries({ queryKey: ["user"] })

        //store jwt token using signup store
        setJwtToken(data?.data?.jwtToken)
        console.log("JWT Token stored in signup store");
      }
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.description || "An error occurred while verifying OTP"
      showToast(errorMsg, "error")
    },
  })

  const handleValidateEmail = async (payload: VerificationPayload) => {
    await mutation.mutateAsync(payload)

  }

  return { handleValidateEmail, isPending: mutation.isPending, data: mutation.data, error: mutation.error }
}

export default ValidateEmail

