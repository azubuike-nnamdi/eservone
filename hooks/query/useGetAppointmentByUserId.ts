import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAppointmentByUserId = () => {

  const getAppointmentByUserId = async () => {
    const response = await api.get(`/eserve-one/get-service-appointment-by-service-user`);
    return response.data;
  };

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["seeker-appointments"],
    queryFn: getAppointmentByUserId,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
    refetchIntervalInBackground: false, // Don't poll in background to save battery
    refetchOnWindowFocus: true, // Refetch when user returns to the app
    staleTime: 0, // Always consider data stale to ensure fresh data
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAppointmentByUserId;