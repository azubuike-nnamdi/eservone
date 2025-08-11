import { PROFILE } from "@/constants/routes";
import { UpdateToBusinessPayload } from "@/constants/types";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

const UpdateToBusiness = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error, isError } = useMutation({
    mutationFn: (payload: UpdateToBusinessPayload) => {
      return api.post(`/eserve-one/upgrade-to-business`, {
        payload
      });
    },
    onSuccess: ({ data }) => {
      if (data) {
        // Navigate immediately
        router.push(PROFILE as any);
        queryClient.invalidateQueries({ queryKey: ["user"] });

      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      const errorMsg = error.response?.data?.description || 'An error occurred while updating to business';
      Alert.alert('Error', errorMsg);
    },
  });

  const handleUpdateToBusiness = (payload: UpdateToBusinessPayload) => {
    mutate(payload);
  };

  return {
    isPending,
    isSuccess,
    error,
    isError,
    handleUpdateToBusiness,
  };
};

export default UpdateToBusiness;