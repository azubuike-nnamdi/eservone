import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";

const useGetProviderAppointments = () => {
  const { accessToken } = useAuthStore();
  const getProviderAppointments = async () => {
    const response = await api.get(`/eserve-one/get-service-appointment-by-provider`, {
      headers: {
        'Authorization': `${accessToken}`,
      }
    });
    return response.data;
  };

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["provider-appointments"],
    queryFn: getProviderAppointments,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
    refetchIntervalInBackground: false, // Don't poll in background to save battery
    refetchOnWindowFocus: true, // Refetch when user returns to the app
    staleTime: 0, // Always consider data stale to ensure fresh data
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetProviderAppointments;