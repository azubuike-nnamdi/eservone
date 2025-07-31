
import { CreateBeneficiaryPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

const useCreateBeneficiary = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { showToast } = useToast()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (payload: CreateBeneficiaryPayload) => api.post(`/eserve-one/create-beneficiary`, payload),
    onSuccess: async (data) => {
      if (data) {
        showToast(data?.data?.description, "success")
        router.back()
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description ?? "Failed to create rating", "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["beneficiary"] })
    }
  })

  const handleCreateBeneficiary = (payload: CreateBeneficiaryPayload) => {

    mutate(payload)
  }

  return { handleCreateBeneficiary, isPending, isSuccess }
}

export default useCreateBeneficiary