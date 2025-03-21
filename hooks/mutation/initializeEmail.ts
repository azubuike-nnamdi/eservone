import { VERIFY_EMAIL } from "@/constants/routes";
import api, { baseURL } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InitializeEmail = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (emailAddress: string) => {
      return api.post(`/eserve-one/initialize-email`, {
        emailAddress
      });
    },
    onSuccess: ({ data }) => {
      console.log('Initialize email success:', data);
      if (data) {
        console.log('real data', data?.data?.requestId)

        // Navigate immediately
        router.push(VERIFY_EMAIL);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        // Store requestId without blocking navigation
        AsyncStorage.setItem('requestId', data?.data?.requestId)
          .catch(error => console.error('Error saving requestId:', error));
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      const errorMsg = error.response?.data?.description || 'An error occurred while onboarding the user';
      console.log('Initialize email error:', errorMsg);
      throw new Error(errorMsg); // Propagate error to the component
    },
  });

  const handleInitializeEmail = (payload: string) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleInitializeEmail,
  };
};

export default InitializeEmail;