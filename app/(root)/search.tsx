import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ProfileHeader from "@/components/common/profile-header";
import SearchBar from "@/components/common/search-bar";
import SeekerServiceCard from "@/components/services/seeker-service-card";
import useGetAllServices from "@/hooks/query/useGetAllServices";
import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isPending, error } = useGetAllServices();

  const services = data?.data;



  return (
    <SafeAreaView className="flex-1 bg-white">
      <ProfileHeader title="Search" showNotification={false} showBackArrow={true} />
      <View className="flex-1 ">
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <SeekerServiceCard
              {...item}
              title={item.serviceName}
              studio={item.studioName || "XYZ Studios"}
              priceRange={`$${item.minimumPrice} - $${item.maximumPrice}`}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          className="px-3 w-full"

          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
              <View className="my-4">
                <SearchBar
                  placeholder="Search for a service"
                  value={searchQuery}
                  onChangeText={(text: string) => setSearchQuery(text)}
                />
              </View>

              {isPending && (
                <LoadingSkeleton count={3} />
              )}
              {error && (
                <Text className="text-red-500 text-center text-lg">
                  {error?.message}
                </Text>
              )}

              {!isPending && !error && searchQuery.trim() && (
                <Text className="text-md text-black mb-3 font-bold">
                  Search Results for:{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            !isPending && !error ? (
              <View className="mt-10 px-5">
                <Text className="text-gray-400 text-center">
                  {searchQuery.trim() ? 'No services found' : 'Start typing to search for services'}
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  )
}