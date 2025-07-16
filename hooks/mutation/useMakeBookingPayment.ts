import { MakeBookingPaymentPayload } from "@/constants/types";
import { useToast } from "@/context/toast-context";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMakeBookingPayment = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: MakeBookingPaymentPayload) =>
      api.post(`/eserve-one/make-payment-in-app`, payload),
    onSuccess: (data) => {
      if (data) {
        showToast(data?.data?.description || "Payment successful", "success");
        queryClient.invalidateQueries({ queryKey: ["payment"] });
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description ?? "Payment failed", "error");
    },
  });

  const handleMakeBookingPayment = (payload: MakeBookingPaymentPayload) => {
    mutate(payload);
  };

  return { handleMakeBookingPayment, isPending };
};

export default useMakeBookingPayment; 