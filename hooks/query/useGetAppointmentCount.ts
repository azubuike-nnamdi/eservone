import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAppointmentCount = () => {
  const getAppointmentCount = async () => {
    const response = await api.get(`/eserve-one/get-appointment-count`);
    return response.data;
  };

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["appointment-count"],
    queryFn: getAppointmentCount,
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAppointmentCount;