import images from "@/constants/images";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex justify-center items-center">
      <Image source={images.logo} className="w-20 h-20" />
    </SafeAreaView>
  );
}
