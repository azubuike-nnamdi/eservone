
import { useAuth } from "@/context/auth-context"
import { setAuthToken } from "@/lib/api"
import { useEffect } from "react"

export function AuthTokenSetter() {
  const { token } = useAuth()

  useEffect(() => {
    // Update the token in the API instance when it changes
    setAuthToken(token)
  }, [token])

  return null // This component doesn't render anything
}

