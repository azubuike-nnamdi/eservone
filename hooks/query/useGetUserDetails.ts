import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetUserDetails = () => {
  const getUserDetails = async () => {
    const response = await api.get('/eserve-one/get-user-details')
    return response.data
  }
  const { data, isPending, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUserDetails
  })
  return { data, isPending, error }
}

export default useGetUserDetails;