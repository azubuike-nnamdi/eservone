//query to get all services

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetUserProfileByEmail = (emailAddress: string) => {
  const getUserProfileByEmail = async () => {
    console.log('🔍 Fetching user profile for email:', emailAddress);
    const response = await api.get(`/eserve-one/get-user-profile-details-by-email?emailAddress=${emailAddress}`)
    return response.data
  }
  const { data, isPending, error } = useQuery({
    queryKey: ['user-profile-by-email', emailAddress],
    queryFn: getUserProfileByEmail,
    enabled: !!emailAddress,
  })

  return {
    data,
    isPending,
    error
  }
}

export default useGetUserProfileByEmail