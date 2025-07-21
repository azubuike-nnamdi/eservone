import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAccountBalance = () => {
  const getAccountBalance = async () => {
    const response = await api.get('/eserve-one/get-account-balance')
    return response.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['payment'],
    queryFn: getAccountBalance
  })

  return { data, isPending, error }
}