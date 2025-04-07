import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { FlatList, View } from 'react-native';

const DashboardSkeleton = () => {
  const renderSkeletonItem = () => (
    <View className="bg-gray-200 rounded-lg p-4 w-[48%] mb-2">
      <Skeleton
        colorMode="light"
        radius="round"
        height={20}
        width="70%"
        show={true}
      />
      <View className="mt-2">
        <Skeleton
          colorMode="light"
          radius="round"
          height={25}
          width="50%"
          show={true}
        />
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
              <Skeleton
                colorMode="light"
                radius="round"
                height={24}
                width="60%"
                show={true}
              />
            </View>
            <View className="flex-row items-center mb-2">
              <View className="mr-2">
                <Skeleton
                  colorMode="light"
                  radius="round"
                  height={30}
                  width={80}
                  show={true}
                />
              </View>
              <Skeleton
                colorMode="light"
                radius="round"
                height={20}
                width={100}
                show={true}
              />
            </View>
            <View className="mt-2 w-full">
              <Skeleton
                colorMode="light"
                radius="round"
                height={50}
                width="100%"
                show={true}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default DashboardSkeleton;