import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReviews = ({ providerEmail }: { providerEmail: string }) => {
  const getAllReviews = async () => {
    const response = await api.get(`/eserve-one/get-all-review?providerEmail=${providerEmail}`,)
    return response.data
  }

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ['reviews', providerEmail],
    queryFn: getAllReviews
  })

  return { data, isPending, error, isError, refetch }
}