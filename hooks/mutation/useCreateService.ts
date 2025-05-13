import { HOME } from "@/constants/routes";
import { useToast } from "@/context/toast-context";
import api from "@/lib/api";
import { useServiceCreationStore } from "@/store/service-creation-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

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
  const resetStore = useServiceCreationStore((state) => state.reset);

  const { showToast } = useToast()

  const { mutate, isPending, isSuccess } = useMutation({
    // Expect the JSON payload object
    mutationFn: (payload: CreateServicePayload) => {
      return api.post(`/eserve-one/create-service`, payload)
    },
    onSuccess: (data) => {
      if (data) {
        showToast(data?.data?.description, "success")
        resetStore()
        router.push(HOME)
      }
      queryClient.invalidateQueries({ queryKey: ["services"] })
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description, "error")
    }
  })

  // Expect the JSON payload object
  const handleCreateService = (payload: CreateServicePayload) => {
    mutate(payload)
  }

  return { handleCreateService, isPending, isSuccess }
}

export default useCreateService