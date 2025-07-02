import { PaymentPayload } from "@/constants/types";
import { useToast } from "@/context/toast-context";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMakePayment = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: PaymentPayload) =>
      api.post(`/eserve-one/make-payment`, payload),
    onSuccess: (data) => {
      if (data) {
        showToast(data?.data?.description || "Payment successful", "success");
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description ?? "Payment failed", "error");
    },
  });

  const handleMakePayment = (payload: PaymentPayload) => {
    mutate(payload);
  };

  return { handleMakePayment, isPending };
};

export default useMakePayment; 