"use client"

import Button from "@/components/common/button"
import images from "@/constants/images"
import type { ValidateResetPasswordEmailPayload, VerificationPayload } from "@/constants/types"
import useValidateResetPasswordEmail from "@/hooks/mutation/useValidateResetPasswordEmail"
import ValidateEmail from "@/hooks/mutation/verify-email"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useRef, useState } from "react"
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

export default function VerifyEmail() {
  const [email, setEmail] = useState<string | null>(null)
  const [flowType, setFlowType] = useState<"signup" | "forgot_password" | null>(null)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isValidOtp, setIsValidOtp] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [requestId, setRequestId] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(30);

  const inputRefs = useRef<(TextInput | null)[]>([])
  const { handleValidateEmail, isPending } = ValidateEmail()
  const { handleValidateResetPasswordEmail, isPending: isResetPasswordPending } = useValidateResetPasswordEmail()

  useEffect(() => {
    const getStoredData = async () => {
      try {
        const [storedEmail, storedFlowType, storedRequestId] = await Promise.all([
          AsyncStorage.getItem("verify_email"),
          AsyncStorage.getItem("flow_type"),
          AsyncStorage.getItem("requestId"),
        ])
        console.log("Retrieved requestId from AsyncStorage:", storedRequestId)
        setEmail(storedEmail)
        setFlowType(storedFlowType as "signup" | "forgot_password")
        setRequestId(storedRequestId)
      } catch (error) {
        console.error("Error retrieving data:", error)
      }
    }

    getStoredData()
  }, [])

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (text: string, index: number) => {
    // Only allow numbers
    if (!/^\d*$/.test(text)) return

    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)
    setIsValidOtp(true)
    setErrorMessage("")

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOtp = async () => {
    const otpString = otp.join("")
    if (otpString.length !== 6) {
      setIsValidOtp(false)
      setErrorMessage("Please enter a valid 6-digit code")
      return
    }

    if (flowType === "forgot_password") {
      const payload: ValidateResetPasswordEmailPayload = {
        otp: otpString,
        requestId: requestId || null,
      }
      handleValidateResetPasswordEmail(payload)
    } else {
      const payload: VerificationPayload = {
        otp: otpString,
        requestId: requestId || null,
      }
      await handleValidateEmail(payload)
    }
  }

  // Resend handler (add your resend logic here)
  const handleResend = () => {
    setCountdown(30);
    // TODO: Add resend code logic here
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-primary-100 rounded-full p-4 w-52 h-52 flex items-center justify-center">
            <Image source={images.SendEmail} className="w-20 h-20" />
          </View>
          <Text className="text-black text-2xl font-semibold text-center mt-4">Verify your email to proceed</Text>
          <Text className="text-black/50 text-lg text-center mt-2">We just sent an email to the address:</Text>
          {email && <Text className="text-gray-400 text-lg text-center mt-2">{email}</Text>}
          <Text className="text-black/50 text-md text-center mt-5 w-4/6">
            Please check your email and provide the verification code we sent to you
          </Text>

          {/* OTP Input */}

          <View className="w-full flex-row justify-between mt-8">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className={`w-12 h-12 border-2 rounded-lg text-center text-xl ${isValidOtp ? 'border-gray-200' : 'border-danger text-center px-4 py-1'
                  }`}
                maxLength={1}
                keyboardType="number-pad"
                value={digit ? "*" : ""}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectTextOnFocus
              />
            ))}
          </View>

          {!isValidOtp && (
            <Text className="text-danger text-sm mt-2">{errorMessage || "Please enter a valid 6-digit code"}</Text>
          )}

          {/* Verify Button */}
          <View className="w-full mt-8">
            <Button
              type="submit"
              disabled={isPending || isResetPasswordPending || otp.join("").length !== 6}
              loading={isPending || isResetPasswordPending}
              loadingText="Verifying..."
              onPress={handleVerifyOtp}
            >
              Verify Email
            </Button>
          </View>

          {/* Resend Code Option */}
          {countdown > 0 ? (
            <Text className="mt-4 text-gray-400 text-sm">Resend code in {countdown}s</Text>
          ) : (
            <TouchableOpacity className="mt-4" onPress={handleResend}>
              <Text className="text-primary-300 text-sm">Didn't receive the code? Resend</Text>
            </TouchableOpacity>
          )}
        </View>


      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

