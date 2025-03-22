import Button from "@/components/common/button";
import ProfileHeader from "@/components/common/profile-header";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/context/user-context";
export default function Index() {
  const { user } = useUser()
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
          <ProfileHeader title="Hire a service" showNotification={true} showBackArrow={false} />
          <View className="border-b border-gray-100" />
          <View className="flex-row items-baseline mt-4">
            <Text className="text-2xl font-rubikSemiBold">Good day,</Text>
            <Text className="text-2xl text-black-300/50 font-rubikMedium ml-1">{user?.firstName}</Text>
          </View>

          <View className="mt-4">
            <Text className="text-[22px] text-black-300 font-rubikBold leading-10">
              Find the right talent and {'\n'}take your ideas to the next level
            </Text>
            <Text className="text-base text-black-300 font-rubikLight">No hassle, just great work.</Text>
          </View>

          <View className="mt-12">
            <Text className="text-base text-black-300 font-rubikLight">What are you looking for?</Text>
            <View >
              <TextInput
                placeholder="Search for a service"
                className="flex-1 border border-gray-100 rounded-lg p-5"
              />
              <Button className="mt-3" >Search </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}