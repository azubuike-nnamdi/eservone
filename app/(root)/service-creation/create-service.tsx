import Button from "@/components/common/button";
import ProfileHeader from "@/components/common/profile-header";
import Step1Details from "@/components/services/Step1Details";
import Step2Pricing from "@/components/services/Step2Pricing";
import Step3Media from "@/components/services/Step3Media";
import useCreateService from "@/hooks/mutation/useCreateService";
import { cn } from "@/lib/utils";
import { useServiceCreationStore } from "@/store/service-creation-store";
import { router } from "expo-router";
import React from "react";
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from "react-native";

const TOTAL_STEPS = 3;

export default function CreateService() {
  const store = useServiceCreationStore();
  const resetStore = useServiceCreationStore((state) => state.reset);
  const { handleCreateService, isPending } = useCreateService(); // For final submission

  const renderStep = () => {
    switch (store.currentStep) {
      case 1:
        return <Step1Details />;
      case 2:
        return <Step2Pricing />;
      case 3:
        return <Step3Media />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (store.currentStep < TOTAL_STEPS) {
      store.setStep(store.currentStep + 1);
    } else {
      // Handle final submission on step 3
      // Validate: Ensure at least one image is uploaded
      if (store.images.length === 0) {
        alert("Please upload at least one image for the service.");
        return; // Stop submission
      }
      handleFinalSubmit(); // Proceed if validation passes
    }
  };

  // --- Handle Header Back Press with Confirmation --- 
  const handleHeaderBackPress = () => {
    // Show confirmation before leaving from any step
    Alert.alert(
      "Discard Service Creation?",
      "Are you sure you want to go back? Your progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Discard",
          style: "destructive",
          onPress: () => {
            resetStore();
            router.back();
          },
        },
      ]
    );
  };

  const handleFinalSubmit = async () => {
    // console.log("Final Data from Store:", store);

    // --- Data Transformation for API Payload ---

    // Determine serviceDeliveryType
    let serviceDeliveryType = "WALK_IN_SERVICE";
    switch (true) {
      case store.deliveryType.homeService:
        serviceDeliveryType = "HOME_SERVICE";
        break;
      case store.deliveryType.virtualService:
        serviceDeliveryType = "VIRTUAL_SERVICE";
        break;
      case store.deliveryType.walkIn:
        serviceDeliveryType = "WALK_IN_SERVICE";
        break;
      default:
        serviceDeliveryType = "WALK_IN_SERVICE";
    }

    // --- Convert images to Base64 (already base64 in store) ---
    let uploadImage: { image: string; imageTitle: string }[] = [];
    try {
      uploadImage = store.images.map((base64, index) => ({
        image: base64, // Already base64
        imageTitle: `service_image_${index + 1}`,
      }));
    } catch (error) {
      console.error("Error processing images:", error);
      alert("Failed to process images for upload. Please try again.");
      return; // Stop submission
    }
    // -----------------------------------------------

    // --- Construct JSON Payload ---
    const apiPayload = {
      serviceName: store.serviceName,
      serviceCategoryId: store.serviceCategory as number,
      serviceDescription: store.serviceDescription,
      serviceDeliveryType: serviceDeliveryType,
      minimumPrice: store.minFee ?? 0,
      maximumPrice: store.maxFee ?? 0,
      address: store.serviceAddress,
      uploadImage: uploadImage, // Use the processed Base64 images
    };


    handleCreateService(apiPayload)

  };

  // Step titles for header (optional)
  const stepTitles = [
    'Service Details',
    'Pricing',
    'Media Upload'
  ]

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ProfileHeader
        title={`Create Service ${store.currentStep > 1 ? `- ${stepTitles[store.currentStep - 1]}` : ''}`}
        showNotification={false}
        showBackArrow={true}
        onBackPress={handleHeaderBackPress}
      />
      {/* Progress Indicator */}

      <View className="px-7 mt-4 mb-2 flex-row space-x-2">
        {[...Array(TOTAL_STEPS)].map((_, index) => (
          <View
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              index === store.currentStep - 1 // Current step
                ? "bg-primary-300"
                : index < store.currentStep // Completed steps
                  ? "bg-primary-300"
                  : "bg-gray-200" // Future steps
            )}
          />
        ))}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset if needed
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-grow pb-5" // Use flex-grow to push button down
          className="flex-1 px-7"
        >
          <View className="flex-1">
            {renderStep()}
          </View>

        </ScrollView>
        {/* Navigation Buttons - outside ScrollView content to stick at bottom */}
        <View className="px-7 pt-4 pb-6 border-t border-gray-200 bg-white">
          <Button
            onPress={handleNext}
            variant='primary'
            loading={store.currentStep === TOTAL_STEPS && isPending}
            disabled={isPending || (store.currentStep === TOTAL_STEPS && store.images.length === 0)}
            loadingText="Publishing..."
          >
            {store.currentStep === TOTAL_STEPS ? "Publish Service" : "Continue"}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}