//query to get all services

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetServiceCategory = () => {
  const getAllServiceCategory = async () => {
    const response = await api.get('/eserve-one/get-service-category')
    return response.data
  }
  const { data, isPending, error } = useQuery({
    queryKey: ['service-category'],
    queryFn: getAllServiceCategory
  })

  return {
    data,
    isPending,
    error
  }
}

export default useGetServiceCategory