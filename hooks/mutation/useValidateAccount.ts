import { ValidateAccountPayload } from "@/constants/types";
import { useToast } from "@/context/toast-context";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const useValidateAccount = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ValidateAccountPayload) =>
      api.post(`/eserve-one/validate-account`, payload),
    onSuccess: (data) => {
      if (data) {
        showToast(data?.data?.description || "Account validated successfully", "success");
        router.back();
        queryClient.invalidateQueries({ queryKey: ["banks"] });
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description ?? "Account validation failed", "error");
    },
  });

  const handleValidateAccount = (payload: ValidateAccountPayload) => {
    mutate(payload);
  };

  return { handleValidateAccount, isPending };
};

export default useValidateAccount; 