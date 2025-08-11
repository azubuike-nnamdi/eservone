import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

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
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  const renderSkeleton = () => {
    const AnimatedView = Animated.createAnimatedComponent(View);
    const skeletonStyle = { opacity };

    switch (variant) {
      case 'card':
        return (
          <View className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-100">
            <AnimatedView style={skeletonStyle} className="w-full h-48 bg-gray-200" />
            <View className="p-4">
              <View className="flex-row justify-between items-start mb-1">
                <AnimatedView style={skeletonStyle} className="h-6 w-32 bg-gray-200 rounded" />
                <AnimatedView style={skeletonStyle} className="h-5 w-24 bg-gray-200 rounded" />
              </View>
              <AnimatedView style={skeletonStyle} className="h-4 w-full bg-gray-200 rounded mb-4" />
              <AnimatedView style={skeletonStyle} className="h-5 w-32 bg-gray-200 rounded" />
            </View>
          </View>
        );
      case 'list':
        return (
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <AnimatedView style={skeletonStyle} className="h-12 w-12 bg-gray-200 rounded-full mr-4" />
            <View className="flex-1">
              <AnimatedView style={skeletonStyle} className="h-5 w-32 bg-gray-200 rounded mb-2" />
              <AnimatedView style={skeletonStyle} className="h-4 w-48 bg-gray-200 rounded" />
            </View>
          </View>
        );
      case 'grid':
        return (
          <View className="bg-white rounded-lg shadow-md overflow-hidden">
            <AnimatedView style={skeletonStyle} className="w-full h-32 bg-gray-200" />
            <View className="p-3">
              <AnimatedView style={skeletonStyle} className="h-5 w-24 bg-gray-200 rounded mb-2" />
              <AnimatedView style={skeletonStyle} className="h-4 w-20 bg-gray-200 rounded" />
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