import { SignUpPayload } from "@/constants/types"
import api from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"


const useSignUpMutate = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignUpPayload) => api.post("/eserve-one/sign-up", payload),
    onSuccess: (data) => {
      console.log(data)
      queryClient.setQueryData(["user"], data)
    },
    onError: (error: any) => {
      console.log(error)
    }
  })

  const handleSignUp = (payload: SignUpPayload) => {
    mutate(payload)
  }

  return { handleSignUp, isPending }
}

export default useSignUpMutate

