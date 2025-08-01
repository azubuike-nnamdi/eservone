import { WithdrawFundsPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useWithdrawFunds = () => {
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (payload: WithdrawFundsPayload) => {
      return api.post(`/eserve-one/withdraw-fund`, payload)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["payment"] })
        queryClient.invalidateQueries({ queryKey: ['account-balance'] });
        queryClient.invalidateQueries({ queryKey: ['transaction-history'] });
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error.response.data.description, 'error')
    }
  })

  const handleWithdrawFunds = (payload: WithdrawFundsPayload) => {
    mutate(payload)
  }

  return { handleWithdrawFunds, isPending, isSuccess }
}

export default useWithdrawFunds