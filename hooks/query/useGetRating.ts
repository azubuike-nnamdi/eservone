import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetRating = ({ providerEmail }: { providerEmail: string }) => {
  const getRating = async () => {
    const response = await api.get(`/eserve-one/get-all-rating?providerEmail=${providerEmail}`,)
    return response.data
  }

  const { data, isPending, error, isError } = useQuery({
    queryKey: ['rating', providerEmail],
    queryFn: getRating
  })

  return { data, isPending, error, isError }
}