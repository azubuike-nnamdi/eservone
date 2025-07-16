
import { InitiatePaymentPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Linking } from "react-native"

const useStripeInitiatePayment = () => {

  const queryClient = useQueryClient()

  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: InitiatePaymentPayload) => api.post(`/eserve-one/stripe-initialize-payment`, payload),
    onSuccess: (data) => {
      if (data) {
        const redirectUrl = data?.data?.data?.authorization_url
        Linking.openURL(redirectUrl)
        showToast(data?.data?.description, "success")

      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description ?? "Failed to initiate payment", "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["payment"] })
    }
  })

  const handleStripeInitiatePayment = (payload: InitiatePaymentPayload) => {

    mutate(payload)
  }

  return { handleStripeInitiatePayment, isPending }
}

export default useStripeInitiatePayment