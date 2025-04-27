import { cn } from "@/lib/utils";
import { View } from "react-native";

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  variant?: 'card' | 'list' | 'grid';
}

const LoadingSkeleton = ({
  className,
  count = 1,
  variant = 'card'
}: LoadingSkeletonProps) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <View className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
            <View className="w-full h-48 bg-gray-200 animate-pulse" />
            <View className="p-4">
              <View className="flex-row justify-between items-start mb-1">
                <View className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                <View className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              </View>
              <View className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4" />
              <View className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            </View>
          </View>
        );
      case 'list':
        return (
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <View className="h-12 w-12 bg-gray-200 rounded-full animate-pulse mr-4" />
            <View className="flex-1">
              <View className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2" />
              <View className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            </View>
          </View>
        );
      case 'grid':
        return (
          <View className="bg-white rounded-lg shadow-md overflow-hidden">
            <View className="w-full h-32 bg-gray-200 animate-pulse" />
            <View className="p-3">
              <View className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2" />
              <View className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </View>
          </View>
        );
    }
  };

  return (
    <View className={cn("w-full", className)}>
      {Array(count).fill(0).map((_, index) => (
        <View key={index}>
          {renderSkeleton()}
        </View>
      ))}
    </View>
  );
};

export default LoadingSkeleton; 