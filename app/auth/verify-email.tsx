"use client"

import Button from "@/components/common/button"
import icons from "@/constants/icons"
import images from "@/constants/images"
import type { ValidateResetPasswordEmailPayload, VerificationPayload } from "@/constants/types"
import useForgotPassword from "@/hooks/mutation/useForgotPassword"
import useValidateResetPasswordEmail from "@/hooks/mutation/useValidateResetPasswordEmail"
import ValidateEmail from "@/hooks/mutation/verify-email"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Clipboard from 'expo-clipboard'
import { router } from "expo-router"
import { useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
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
  const [showPastePrompt, setShowPastePrompt] = useState(false);
  const [clipboardOtp, setClipboardOtp] = useState("");

  const inputRefs = useRef<(TextInput | null)[]>([])
  const { handleValidateEmail, isPending } = ValidateEmail()
  const { handleValidateResetPasswordEmail, isPending: isResetPasswordPending } = useValidateResetPasswordEmail()
  const { handleForgotPassword, isPending: isResendPending } = useForgotPassword()

  useEffect(() => {
    const getStoredData = async () => {
      try {
        const [storedEmail, storedFlowType, storedRequestId] = await Promise.all([
          AsyncStorage.getItem("forgot_password_email"),
          AsyncStorage.getItem("flow_type"),
          AsyncStorage.getItem("requestId"),
        ])

        // Also check for verify_email if forgot_password_email is not found (for signup flow)
        let emailToUse = storedEmail;
        if (!emailToUse) {
          emailToUse = await AsyncStorage.getItem("verify_email");
        }

        console.log("Retrieved requestId from AsyncStorage:", storedRequestId)
        setEmail(emailToUse)
        setFlowType(storedFlowType as "signup" | "forgot_password")
        setRequestId(storedRequestId)
      } catch (error) {
        console.error("Error retrieving data:", error)
      }
    }

    getStoredData()
  }, [])

  // Check clipboard for 6-digit OTP when screen is focused
  useEffect(() => {
    const checkClipboardForOtp = async () => {
      try {
        const clipboardContent = await Clipboard.getStringAsync();
        // Find the most recent 6-digit code in the clipboard (last occurrence)
        const matches = clipboardContent.match(/\d{6}(?!.*\d{6})/);
        if (matches && matches[0]) {
          const code = matches[0];
          const currentOtp = otp.join("");
          if (code !== currentOtp) {
            setClipboardOtp(code);
            setShowPastePrompt(true);
          }
        } else {
          setShowPastePrompt(false);
        }
      } catch {
        console.log("Clipboard access not available");
      }
    };

    // Check immediately on mount
    checkClipboardForOtp();

    // Set up interval to check clipboard periodically (every 2 seconds)
    const interval = setInterval(checkClipboardForOtp, 2000);

    return () => clearInterval(interval);
  }, [otp]); // Re-run when OTP changes

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

  // Resend handler
  const handleResend = async () => {
    if (email && flowType === "forgot_password") {
      setCountdown(30);
      setOtp(["", "", "", "", "", ""]);
      setIsValidOtp(true);
      setErrorMessage("");

      // Call the forgot password API to resend OTP
      handleForgotPassword({ email });
    }
  };

  // Clear stored verification data when going back
  const handleGoBack = async () => {
    try {
      await AsyncStorage.multiRemove(['verify_email', 'requestId', 'forgot_password_email', 'flow_type']);
    } catch (error) {
      console.error("Error clearing verification data:", error);
    }
    router.back();
  };

  // Handle user accepting to paste OTP
  const handlePasteOtp = () => {
    if (clipboardOtp && /^\d{6}$/.test(clipboardOtp)) {
      setOtp(clipboardOtp.split(""));
      setShowPastePrompt(false);
      setIsValidOtp(true);
      setErrorMessage("");
      // Optionally, focus the last input
      inputRefs.current[5]?.focus();
    }
  };
  // Handle user declining to paste OTP
  const handleDeclinePaste = () => {
    setShowPastePrompt(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        {/* Loading Overlay for Resend OTP */}
        {isResendPending && (
          <View className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <View className="bg-white rounded-lg p-6 items-center">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="text-black text-lg font-medium mt-4">Resending OTP...</Text>
              <Text className="text-gray-500 text-sm mt-2 text-center">
                Please wait while we send a new verification code
              </Text>
            </View>
          </View>
        )}
        {/* Back Arrow */}
        <TouchableOpacity
          className="absolute top-16 left-6 z-10 p-2"
          onPress={handleGoBack}
        >
          <Image source={icons.backArrow} className="w-8 h-8" />
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center px-6">
          {/* Paste OTP Prompt */}
          {showPastePrompt && (
            <View className="w-full bg-primary-100 border border-primary-300 rounded-lg p-4 mb-4 flex-row items-center justify-between">
              <Text className="text-black flex-1">Paste the 6-digit code from your clipboard?</Text>
              <TouchableOpacity className="ml-2 px-3 py-1 bg-primary-300 rounded" onPress={handlePasteOtp}>
                <Text className="text-white font-semibold">Paste</Text>
              </TouchableOpacity>
              <TouchableOpacity className="ml-2 px-3 py-1 bg-gray-300 rounded" onPress={handleDeclinePaste}>
                <Text className="text-black font-semibold">No</Text>
              </TouchableOpacity>
            </View>
          )}
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
            {otp.map((digit, index) => {
              // Conditionally add onPaste for web only
              const textInputProps = Platform.OS === 'web' ? {
                onPaste: (e: any) => {
                  const pasted = e.clipboardData.getData('Text');
                  // Find the most recent 6-digit code in the pasted text
                  const matches = pasted.match(/\d{6}(?!.*\d{6})/);
                  if (matches && matches[0]) {
                    setOtp(matches[0].split(""));
                    setIsValidOtp(true);
                    setErrorMessage("");
                    inputRefs.current[5]?.focus();
                    e.preventDefault();
                  } else {
                    handleOtpChange(pasted, index);
                  }
                }
              } : {};
              return (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  className={`w-12 h-12 border-2 rounded-lg text-center text-xl ${isValidOtp ? 'border-gray-200' : 'border-danger text-center px-4 py-1'
                    }`}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit ? "*" : ""}
                  onChangeText={(text) => {
                    // If user pastes a 6-digit code, auto-fill all fields
                    const matches = text.match(/\d{6}(?!.*\d{6})/);
                    if (matches && matches[0]) {
                      setOtp(matches[0].split(""));
                      setIsValidOtp(true);
                      setErrorMessage("");
                      inputRefs.current[5]?.focus();
                    } else {
                      handleOtpChange(text, index);
                    }
                  }}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  selectTextOnFocus
                  {...textInputProps}
                />
              )
            })}
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
            <TouchableOpacity
              className="mt-4"
              onPress={handleResend}
              disabled={isResendPending}
            >
              <Text className={`text-sm ${isResendPending ? 'text-gray-400' : 'text-primary-300'}`}>
                {isResendPending ? 'Resending...' : "Didn't receive the code? Resend"}
              </Text>
            </TouchableOpacity>
          )}
        </View>


      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

