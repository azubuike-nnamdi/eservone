//query to get all services

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllServices = () => {
  const getAllServices = async () => {
    const response = await api.get('/eserve-one/get-service')
    return response.data
  }
  const { data, isPending, error } = useQuery({
    queryKey: ['services'],
    queryFn: getAllServices
  })

  return {
    data,
    isPending,
    error
  }
}

export default useGetAllServices