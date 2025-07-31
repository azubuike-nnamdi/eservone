import { WithdrawFundsPayload } from "@/constants/types"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Alert } from "react-native"

const useWithdrawFunds = () => {

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: WithdrawFundsPayload) => {
      return api.post(`/eserve-one/withdraw-fund`, payload)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["payment"] })
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      Alert.alert('Error', error.response.data.description)
    }
  })

  const handleWithdrawFunds = (payload: WithdrawFundsPayload) => {
    mutate(payload)
  }

  return { handleWithdrawFunds, isPending }
}

export default useWithdrawFunds