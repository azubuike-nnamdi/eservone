import ProfileHeader from "@/components/common/profile-header";
import { ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Messages() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <ProfileHeader title='Messages' showNotification={false} />
      </ScrollView>
    </SafeAreaView>
  )
} 