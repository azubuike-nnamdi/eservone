import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetServiceById = (serviceId: string) => {
  const getServiceById = async () => {
    const response = await api.get(`/eserve-one/get-service-by-id?id=${serviceId}`);
    return response.data;
  };
  const { data, isPending, error } = useQuery({
    queryKey: ["service", serviceId],
    queryFn: getServiceById,
  });

  return { data, isPending, error };
}

export default useGetServiceById;