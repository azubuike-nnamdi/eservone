import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAppointmentByUserId = () => {

  const getAppointmentByUserId = async () => {
    const response = await api.get(`/eserve-one/get-service-appointment-by-service-user`);
    return response.data;
  };

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointmentByUserId,
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAppointmentByUserId;