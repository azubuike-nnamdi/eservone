import { BookAppointmentPayload } from "@/constants/types"
import { useToast } from "@/context/toast-context"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useRef } from "react"

const useBookAppointment = () => {

  const queryClient = useQueryClient()
  const serviceDataRef = useRef<any>(null)

  const router = useRouter()
  const { showToast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: BookAppointmentPayload) => api.post(`/eserve-one/create-service-appointment`, payload),
    onSuccess: async (data) => {
      if (data) {
        // console.log("data for appointment", data?.data)
        showToast(data?.data?.description, "success")

        // Update ref with appointment data that contains the emails
        serviceDataRef.current = data?.data

        const chatRoomId = data?.data?.data?.chatRoomId
        const userEmail = data?.data?.data?.userEmail
        const receiverEmail = data?.data?.data?.serviceProviderEmail

        if (chatRoomId) {
          router.push(`/message-room/${chatRoomId}?userEmail=${userEmail}&receiverEmail=${receiverEmail}`)
        } else {
          router.push("/(tabs)/messages" as any)
        }
      }
    },
    onError: (error: { response: { data: { description: string } } }) => {
      showToast(error?.response?.data?.description ?? "Failed to book appointment", "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    }
  })

  const handleBookAppointment = (payload: BookAppointmentPayload, serviceData?: any) => {
    // Store the service data in ref for access in onSuccess
    serviceDataRef.current = serviceData
    console.log("Booking appointment with serviceData:", serviceData)
    console.log("chatRoomId from service:", serviceData?.chatRoomId)
    mutate(payload)
  }

  return { handleBookAppointment, isPending }
}

export default useBookAppointment