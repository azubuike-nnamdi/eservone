import { ValidateAccountPayload } from "@/constants/types";
import { useToast } from "@/context/toast-context";
import { api } from "@/lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useValidateAccount = () => {

  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [validatedAccountName, setValidatedAccountName] = useState<string>('');

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (payload: ValidateAccountPayload) =>
      api.post(`/eserve-one/validate-account`, payload),
    onSuccess: (data) => {
      if (data) {
        const accountName = data?.data?.data?.accountName;

        setValidatedAccountName(accountName ?? '');
        AsyncStorage.setItem('accountName', accountName ?? '');
        queryClient.invalidateQueries({ queryKey: ["banks"] });
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      console.log('error', error)
      showToast(error?.response?.data?.description ?? "Account validation failed", "error");
    },
  });

  const handleValidateAccount = (payload: ValidateAccountPayload) => {
    mutate(payload);
  };

  return { handleValidateAccount, isPending, isSuccess, validatedAccountName };
};

export default useValidateAccount; 