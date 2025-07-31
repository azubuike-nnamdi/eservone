import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetBeneficiaries = () => {
  const getBeneficiaries = async () => {
    const response = await api.get('/eserve-one/get-beneficiary')
    return response.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['beneficiaries'],
    queryFn: getBeneficiaries
  })

  return { data, isPending, error }
}