import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReviews = () => {
  const getAllReviews = async () => {
    const response = await api.get('/eserve-one/get-all-review')
    return response.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: getAllReviews
  })

  return { data, isPending, error }
}