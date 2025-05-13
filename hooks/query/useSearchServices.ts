//query to get searched services

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useSearchServices = (searchValue: string) => {
  const searchServices = async (searchValue: string) => {
    const response = await api.get(`/eserve-one/search-service?serviceValue=${searchValue}`)
    return response.data
  }
  const { data, isPending, error } = useQuery({
    queryKey: ['search-services', searchValue],
    queryFn: () => searchServices(searchValue),
  })

  return {
    data,
    isPending,
    error
  }
}

export default useSearchServices