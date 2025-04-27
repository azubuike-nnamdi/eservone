import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetServicesByUserId = (userId: string) => {
  const getServicesByUserId = async () => {
    const response = await api.get(`/eserve-one/get-service-by-user-id`, {
      headers: {
        'userId': userId
      }
    });
    return response.data;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["services", userId],
    queryFn: getServicesByUserId,
  });

  return { data, isPending, error };
};

export default useGetServicesByUserId;