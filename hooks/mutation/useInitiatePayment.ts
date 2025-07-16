
import { InitiatePaymentPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useInitiatePayment = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: (payload: InitiatePaymentPayload) => api.post(`/eserve-one/paystack-initialize-payment`, payload),
    onSuccess: (data) => {
      if (data) {
        // const redirectUrl = data?.data?.data?.authorization_url
        // Linking.openURL(redirectUrl)
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

  const handleInitiatePayment = (payload: InitiatePaymentPayload) => {
    return mutateAsync(payload)
  }

  return { handleInitiatePayment, isPending, data }
}

export default useInitiatePayment