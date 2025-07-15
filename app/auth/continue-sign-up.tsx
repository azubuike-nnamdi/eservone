import AuthHeader from '@/components/common/auth-header'
import { PersonalDetailsStep } from '@/components/personal-detail-step'
import { SecurityStep } from '@/components/security-step'
import { ServiceTypeStep } from '@/components/service-type-step'
import { TermsStep } from '@/components/terms-step'
import { SignUpPayload } from '@/constants/types'
import { useOnboardingStore } from '@/store/onboarding-store'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import * as Device from "expo-device"

import useSignUpMutate from '@/hooks/mutation/useSignUpMutate'

export default function ContinueSignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const { handleSignUp, isPending } = useSignUpMutate()
  const { data, setServiceType, setSecurity, setTermsAccepted } = useOnboardingStore()

  const updateStep = (step: number) => {
    if (step < 4) {
      setCurrentStep(step + 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ServiceTypeStep
          onNext={(type) => {
            setServiceType(type);
            updateStep(1);
          }}
        />;
      case 2:
        return <PersonalDetailsStep
          onNext={() => updateStep(2)}
        />;
      case 3:
        return <SecurityStep
          onNext={(security) => {
            setSecurity(security);
            updateStep(3);
          }}
        />;
      case 4:
        return <TermsStep
          onSubmit={(accepted) => {
            setTermsAccepted(accepted);

            const payload: SignUpPayload = {
              firstName: data.personalDetails.firstName,
              lastName: data.personalDetails.lastName,
              password: data.security.password,
              agreeTermsOfReference: Boolean(accepted).toString(),
              deviceId: Device.modelName,
              userRole: data.serviceType,
              country: data.personalDetails.country,
            }
            handleSignUp(payload);

          }}
          isPending={isPending}
        />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6">
          <AuthHeader title="Complete your account setup" />

          {/* Progress Indicator */}
          <View className="flex-row justify-between mt-4 mb-8">
            {[1, 2, 3, 4].map((step) => (
              <View
                key={step}
                className={`h-1 flex-1 mx-1 rounded ${step <= currentStep ? 'bg-primary-300' : 'bg-gray-200'
                  }`}
              />
            ))}
          </View>

          <Text className="text-gray-400 text-center mb-6">
            Step {currentStep} of 4 - {getStepTitle(currentStep)}
          </Text>

          {renderStep()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

// Helper function to get step titles
const getStepTitle = (step: number): string => {
  switch (step) {
    case 1:
      return 'Service type';
    case 2:
      return 'Personal details';
    case 3:
      return 'Secure your account';
    case 4:
      return 'Terms of service';
    default:
      return '';
  }
};




