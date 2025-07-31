import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
;

const useGetTransactionQuery = (reference: string) => {
  const getTransactionQuery = async () => {
    const response = await api.get(`/eserve-one/verify-paystack-payment?transRef=${reference}`);
    return response.data;
  };
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["payment", reference],
    queryFn: getTransactionQuery,
  });

  return { data, isPending, error, refetch };
}

export default useGetTransactionQuery;