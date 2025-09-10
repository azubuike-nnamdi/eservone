//query to get all services

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetServiceCategoryByUser = () => {
  const getAllServiceCategory = async () => {
    const response = await api.get('/eserve-one/get-service-category-by-user')
    return response.data
  }
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['service-category-by-user'],
    queryFn: getAllServiceCategory
  })

  return {
    data,
    isPending,
    error,
    isError
  }
}

export default useGetServiceCategoryByUser