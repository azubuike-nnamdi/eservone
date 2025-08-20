import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const InitializeRefreshToken = () => {
  const queryClient = useQueryClient();
  const refreshToken = useAuthStore.getState().refreshToken;
  const mutation = useMutation({
    mutationFn: () => {
      return api.post(`/eserve-one/refresh-token`, {
        refreshToken: refreshToken
      });
    },
    onSuccess: ({ data }) => {
      if (data) {
        const { jwtToken: newAccessToken, refreshToken: newRefreshToken } = data.data;
        const currentUser = useAuthStore.getState().user;

        // Save the new tokens to the auth store
        useAuthStore.getState().setAuth(newAccessToken, newRefreshToken, currentUser!);

        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      const errorMsg = error.response?.data?.description || 'An error occurred while onboarding the user';
      Alert.alert('Error', errorMsg);
    },
  });

  const handleInitializeRefreshToken = () => {
    mutation.mutate();
  };

  return {
    ...mutation,
    handleInitializeRefreshToken,
  };
};

export default InitializeRefreshToken;