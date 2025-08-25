
import { UploadIndustrialCertificatePayload } from "@/constants/types"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Alert } from "react-native"

const useUploadIndustrialCertificate = () => {
  const router = useRouter()
  const queryClient = useQueryClient()


  const { mutate, isPending } = useMutation({
    mutationFn: (payload: UploadIndustrialCertificatePayload) => api.post(`/eserve-one/upload-industry-certificate`, payload),
    onSuccess: async (data) => {
      if (data) {
        Alert.alert('Success', data?.data?.description)
        router.back()
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      Alert.alert('Error', error?.response?.data?.description ?? "Failed to upload industrial certificate")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] })
    }
  })

  const handleUploadIndustrialCertificate = (payload: UploadIndustrialCertificatePayload) => {

    mutate(payload)
  }

  return { handleUploadIndustrialCertificate, isPending }
}

export default useUploadIndustrialCertificate