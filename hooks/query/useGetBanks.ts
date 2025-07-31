import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetBanks = () => {
  const getBanks = async () => {
    const response = await api.get('/eserve-one/get-banks')
    return response.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanks
  })

  return { data, isPending, error }
}