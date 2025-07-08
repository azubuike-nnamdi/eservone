import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCountries = () => {
  const getAllCountries = async () => {
    const response = await api.get('/eserve-one/get-all-currency')
    return response.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['countries'],
    queryFn: getAllCountries
  })

  return { data, isPending, error }
}