import { RegisterPushTokenPayload } from "@/constants/types";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const useRegisterPushNotification = () => {

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (payload: RegisterPushTokenPayload) =>
      api.post(`/eserve-one/register-push-notification`, payload),
    onSuccess: (data) => {
      console.log('Push notification registered successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to register push notification:', error);
    },
  });

  return {
    registerPushNotification: mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export default useRegisterPushNotification;