//query to get searched services

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useCheckBusinessName = (businessName: string) => {
  const checkBusinessName = async (businessName: string) => {
    const response = await api.get(`/eserve-one/check-business-name?businessName=${businessName}`)
    return response.data
  }
  const { data, isPending, error, isSuccess, isError } = useQuery({
    queryKey: ['business', businessName],
    queryFn: () => checkBusinessName(businessName),
    enabled: !!businessName, // Only run if businessName is not empty
  })

  return {
    data,
    isPending,
    error,
    isSuccess,
    isError
  }
}

export default useCheckBusinessName