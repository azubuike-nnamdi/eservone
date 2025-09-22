import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAccountBalance = () => {
  const getAccountBalance = async () => {
    const response = await api.get('/eserve-one/get-account-balance')
    return response.data
  }

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['payment'],
    queryFn: getAccountBalance,
    refetchInterval: 10000, // Refetch every 10 seconds for real-time balance updates
    refetchIntervalInBackground: false, // Don't poll in background to save battery
    refetchOnWindowFocus: true, // Refetch when user returns to the app
    staleTime: 0, // Always consider data stale to ensure fresh balance
  })

  return { data, isPending, error, refetch }
}