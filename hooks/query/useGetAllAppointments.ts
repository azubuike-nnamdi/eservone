import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAppointments = () => {
  const getAllAppointments = async () => {
    const response = await api.get('/eserve-one/get-all-appointments')
    return response.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ['appointments'],
    staleTime: 1000,
    queryFn: getAllAppointments
  })

  return { data, isPending, error }
}