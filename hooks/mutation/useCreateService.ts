import { MANAGE_SERVICES } from "@/constants/routes";
import { useToast } from "@/context/toast-context";
import { api } from "@/lib/api";
import { useServiceCreationStore } from "@/store/service-creation-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

// Define the payload structure according to the API's JSON expectation
interface CreateServicePayload {
  serviceName: string;
  serviceCategoryId: number;
  serviceDescription: string;
  serviceDeliveryType: string;
  minimumPrice: number;
  maximumPrice: number;
  address: string;
  homeService: boolean;
  walkInService: boolean;
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

        Alert.alert(data?.data?.description)
        resetStore()
        router.push(MANAGE_SERVICES)
      }
      queryClient.invalidateQueries({ queryKey: ["services"] })
    },
    onError: (error: { response: { data: { description: string } } }) => {

      Alert.alert(error?.response?.data?.description || "Something went wrong")
      //redirect user to verify identity if message is "You cannot create service, Kindly complete signup."
      if (error?.response?.data?.description === "You cannot create service, Kindly complete signup") {
        router.push('/service-creation/verify-identity')
      }

    }
  })

  // Expect the JSON payload object
  const handleCreateService = (payload: CreateServicePayload) => {
    mutate(payload)
  }

  return { handleCreateService, isPending, isSuccess }
}

export default useCreateService