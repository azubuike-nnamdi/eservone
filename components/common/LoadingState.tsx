import { LoadingStateProps } from "@/constants/types";
import { cn } from "@/lib/utils";
import { ActivityIndicator, Text, View } from "react-native";


const LoadingState = ({
  isLoading,
  text = "Loading...",
  className,
  spinnerColor = "#0000ff"
}: LoadingStateProps) => {
  if (!isLoading) return null;

  return (
    <View className={cn("flex-row items-center justify-center space-x-2", className)}>
      <ActivityIndicator size="small" color={spinnerColor} />
      <Text className="text-gray-600">{text}</Text>
    </View>
  );
};

export default LoadingState; 