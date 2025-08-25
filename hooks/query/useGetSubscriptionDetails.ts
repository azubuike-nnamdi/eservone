import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscriptionDetails = () => {
  const getSubscriptionDetails = async () => {
    const response = await api.get('/eserve-one/subscription-details')
    return response.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['subscription-details'],
    queryFn: getSubscriptionDetails
  })

  return { data, isPending, error }
}