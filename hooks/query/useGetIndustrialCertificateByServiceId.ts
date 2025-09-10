import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetServicesByUserId = (serviceId: string) => {

  const getIndustrialCertificateByServiceId = async () => {
    const response = await api.get(`/eserve-one/get-industry-certificate-by-service-id?serviceId=${serviceId}`);
    return response.data;
  };

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["industrial-certificate", serviceId],
    queryFn: getIndustrialCertificateByServiceId,
  });

  return { data, isPending, error, isError };
};

export default useGetServicesByUserId;