import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetReviewByServiceId = (serviceId: string) => {
  const getReviewByServiceId = async () => {
    const response = await api.get(`/eserve-one/get-review-by-service?serviceId=${serviceId}`)
    return response.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['reviews', serviceId],
    queryFn: getReviewByServiceId
  })

  return { data, isPending, error }
}