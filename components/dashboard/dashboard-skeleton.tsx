import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, View } from 'react-native';

const SkeletonBox = ({ height, width, className = "" }: { height: number; width: string | number; className?: string }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      className={`bg-gray-200 rounded ${className}`}
      style={{
        height,
        width: width as any,
        opacity
      }}
    />
  );
};

const DashboardSkeleton = () => {
  const renderSkeletonItem = () => (
    <View className="bg-gray-200 rounded-lg p-4 w-[48%] mb-2">
      <SkeletonBox height={20} width="70%" />
      <View className="mt-2">
        <SkeletonBox height={25} width="50%" />
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={renderSkeletonItem}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListFooterComponent={
          <View className="mt-4 items-center">
            <View className="mb-2">
              <SkeletonBox height={24} width="60%" />
            </View>
            <View className="flex-row items-center mb-2">
              <View className="mr-2">
                <SkeletonBox height={30} width={80} />
              </View>
              <SkeletonBox height={20} width={100} />
            </View>
            <View className="mt-2 w-full">
              <SkeletonBox height={50} width="100%" />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default DashboardSkeleton;