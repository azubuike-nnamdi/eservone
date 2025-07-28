import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllRatings = () => {
  const getAllRatings = async () => {
    const response = await api.get('/eserve-one/get-ratings')
    return response.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['ratings'],
    queryFn: getAllRatings
  })

  return { data, isPending, error }
}