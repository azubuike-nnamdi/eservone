import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetIndustrialCertificate = () => {
  const getIndustrialCertificate = async () => {
    const response = await api.get('/eserve-one/get-industry-certificate')
    return response.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['industrial-certificate'],
    queryFn: getIndustrialCertificate
  })

  return { data, isPending, error }
}