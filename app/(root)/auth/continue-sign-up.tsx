import AuthHeader from '@/components/common/auth-header'
import Button from '@/components/common/button'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { PersonalDetailsStep } from '@/components/personal-detail-step'
import { ServiceTypeStep } from '@/components/service-type-step'
import { FormData } from '@/constants/types'
import { SecurityStep } from '@/components/security-step'
import { TermsStep } from '@/components/terms-step'
import { router } from 'expo-router'
import { HOME } from '@/constants/routes'

export default function ContinueSignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
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
          onSubmit={(accepted) => {
            setFormData(prev => ({ ...prev, termsAccepted: accepted }));
            handleSubmit();
          }}
        />;
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    try {
      setTimeout(() => {

        setLoading(false);
        router.push(HOME);
      }, 2000);
      // Submit all form data to API
      console.log('Submitting form data:', formData);
      // Add your API call here
    } catch (error) {
      setLoading(false)
      console.error('Error submitting form:', error);
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




