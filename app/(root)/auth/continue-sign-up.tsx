import AuthHeader from '@/components/common/auth-header'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PersonalDetailsStep } from '@/components/personal-detail-step'
import { ServiceTypeStep } from '@/components/service-type-step'
import { FormData, SignUpPayload } from '@/constants/types'
import { SecurityStep } from '@/components/security-step'
import { TermsStep } from '@/components/terms-step'

import * as Device from "expo-device"

import useSignUpMutate from '@/hooks/mutation/useSignUpMutate'

export default function ContinueSignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const { handleSignUp, isPending } = useSignUpMutate()

  const [formData, setFormData] = useState<FormData>({
    serviceType: null,
    personalDetails: {
      firstName: '',
      lastName: '',
    },
    security: {
      password: '',
      confirmPassword: '',
    },
    termsAccepted: false,
  });

  const updateFormData = (step: number, data: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
    if (step < 4) {
      setCurrentStep(step + 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ServiceTypeStep
          onNext={(type) => updateFormData(1, { serviceType: type })}
        />;
      case 2:
        return <PersonalDetailsStep
          data={formData.personalDetails}
          onNext={(details) => updateFormData(2, { personalDetails: details })}
        />;
      case 3:
        return <SecurityStep
          data={formData.security}
          onNext={(security) => updateFormData(3, { security })}
        />;
      case 4:
        return <TermsStep
          onSubmit={async (accepted) => {
            const updatedFormData = {
              ...formData,
              termsAccepted: accepted
            };
            setFormData(updatedFormData);

            const payload: SignUpPayload = {
              firstName: updatedFormData.personalDetails.firstName,
              lastName: updatedFormData.personalDetails.lastName,
              password: updatedFormData.security.password,
              agreeTermsOfReference: Boolean(accepted).toString(),
              deviceId: Device.modelId,
              userRole: updatedFormData.serviceType,
            }

            console.log('payload', payload)

            await handleSignUp(payload);
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




