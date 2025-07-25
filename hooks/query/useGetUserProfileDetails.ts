import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetUserProfileDetails = () => {
  const getUserProfileDetails = async () => {
    const response = await api.get(`/eserve-one/get-user-profile-details`);
    return response.data;
  };

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["userProfileDetails"],
    queryFn: getUserProfileDetails,
  });

  return { data, isPending, error, refetch };
};

export default useGetUserProfileDetails;