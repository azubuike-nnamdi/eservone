import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionHistory = () => {
  const getTransactionHistory = async () => {
    const response = await api.get('/eserve-one/get-recent-transaction')
    return response.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['payment'],
    queryFn: getTransactionHistory
  })

  return { data, isPending, error }
}