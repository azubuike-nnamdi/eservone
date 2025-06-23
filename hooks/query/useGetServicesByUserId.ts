import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";

const useGetServicesByUserId = () => {
  const { accessToken } = useAuthStore();
  const getServicesByUserId = async () => {
    const response = await api.get(`/eserve-one/get-service-by-user-id`, {
      headers: {
        'Authorization': `${accessToken}`,
      }
    });
    return response.data;
  };

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["user-services"],
    queryFn: getServicesByUserId,
  });

  return { data, isPending, error, isError };
};

export default useGetServicesByUserId;