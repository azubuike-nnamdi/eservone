import images from '@/constants/images'
import React, { useEffect, useState, useRef } from 'react'
import { View, SafeAreaView, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/common/button";
import { router } from 'expo-router';
import { RESET_PASSWORD, CONTINUE_SIGN_UP } from '@/constants/routes';

export default function VerifyEmail() {
  const [email, setEmail] = useState<string | null>(null);
  const [flowType, setFlowType] = useState<'signup' | 'forgot_password' | null>(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isValidOtp, setIsValidOtp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const getStoredData = async () => {
      try {
        const [storedEmail, storedFlowType] = await Promise.all([
          AsyncStorage.getItem('verify_email'),
          AsyncStorage.getItem('flow_type')
        ]);
        setEmail(storedEmail);
        setFlowType(storedFlowType as 'signup' | 'forgot_password');
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    getStoredData();
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    // Only allow numbers
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setIsValidOtp(false);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate based on flow type
      if (flowType === 'forgot_password') {
        router.push(RESET_PASSWORD);
      } else if (flowType === 'signup') {
        router.push(CONTINUE_SIGN_UP);  // Your signup next step route
      } else {
        console.error('Unknown flow type');
      }

      console.log('Verifying OTP:', otpString);
      // Add your OTP verification logic here
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1">
        <View className="flex-1 items-center justify-center px-6">
          <View className='bg-primary-100 rounded-full p-4 w-52 h-52 flex items-center justify-center'>
            <Image source={images.SendEmail} className="w-20 h-20" />
          </View>
          <Text className='text-black text-2xl font-semibold text-center mt-4'>Verify your email to proceed</Text>
          <Text className='text-black/50 text-lg text-center mt-2'>We just sent an email to the address:</Text>
          {email && (
            <Text className='text-gray-400 text-lg text-center mt-2'>{email}</Text>
          )}
          <Text className='text-black/50 text-md text-center mt-5 w-4/6'>
            Please check your email and provide the verification code we sent to you
          </Text>

          {/* OTP Input */}
          <View className="w-full flex-row justify-between mt-8">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className={`w-12 h-12 border-2 rounded-lg text-center text-xl ${isValidOtp ? 'border-gray-200' : 'border-danger'
                  }`}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectTextOnFocus
              />
            ))}
          </View>

          {!isValidOtp && (
            <Text className="text-danger text-sm mt-2">
              Please enter a valid 6-digit code
            </Text>
          )}

          {/* Verify Button */}
          <View className="w-full mt-8">
            <Button
              type="submit"
              disabled={isLoading || otp.join('').length !== 6}
              loading={isLoading}
              loadingText="Verifying..."
              onPress={handleVerifyOtp}
            >
              Verify Email
            </Button>
          </View>

          {/* Resend Code Option */}
          <TouchableOpacity className="mt-4">
            <Text className="text-primary-300 text-sm">
              Didn't receive the code? Resend
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
