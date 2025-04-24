import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

// Define the payload structure according to the API's JSON expectation
interface CreateServicePayload {
  serviceName: string;
  serviceCategoryId: number;
  serviceDescription: string;
  serviceDeliveryType: string;
  minimumPrice: number;
  maximumPrice: number;
  receivablePrice?: number; // Keep commented if calculated server-side
  uploadImage: {
    image: string; // Base64 encoded string
    imageTitle: string;
  }[];
}

export const useCreateService = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, isSuccess } = useMutation({
    // Expect the JSON payload object
    mutationFn: (payload: CreateServicePayload) => {
      return api.post(`/eserve-one/create-service`, payload)
    },
    onSuccess: (data) => {
      if (data) {
        Alert.alert('Success', data?.data?.description)
      }
      queryClient.invalidateQueries({ queryKey: ["services"] })
    },
    onError: (error: { response: { data: { description: string } } }) => {
      Alert.alert('Error', error?.response?.data?.description)
    }
  })

  // Expect the JSON payload object
  const handleCreateService = (payload: CreateServicePayload) => {
    mutate(payload)
  }

  return { handleCreateService, isPending, isSuccess }
}

export default useCreateService