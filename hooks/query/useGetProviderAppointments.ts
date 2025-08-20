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
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetProviderAppointments;