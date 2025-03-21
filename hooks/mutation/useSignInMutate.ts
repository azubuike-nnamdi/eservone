import { SignInPayload } from "@/constants/types"
import api from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"


const useSignInMutate = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignInPayload) => api.post("/eserve-one/user-login", payload),
    onSuccess: (data) => {
      console.log(data)
      queryClient.setQueryData(["user"], data)
    },
    onError: (error: any) => {
      console.log(error)
    }
  })

  const handleSignIn = (payload: SignInPayload) => {
    mutate(payload)
  }

  return { handleSignIn, isPending }
}

export default useSignInMutate