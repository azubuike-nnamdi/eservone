import React, { useState, useRef, useEffect } from "react";
import images from "@/constants/images";
import { Image, Text, View, TouchableOpacity, Dimensions, FlatList } from "react-native";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import { SlideItem } from "@/constants/types";
import { slides } from "@/constants/data";
import { router } from "expo-router";
import { SIGN_IN, SIGN_UP } from "@/constants/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function OnboardingFlatList() {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
      flatListRef.current?.scrollToIndex({
        index: (activeSlide + 1) % slides.length,
        animated: true
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [activeSlide]);

  const renderSlideItem = ({ item }: { item: SlideItem }) => {
    return (
      <View style={{ width }} className="items-center justify-center px-6">
        <Image
          source={item.image}
          className="w-[320px] h-[280px]"
          resizeMode="contain"
        />
      </View>
    );
  };

  const Pagination = () => {
    return (
      <View className="flex-row justify-center space-x-3 mt-8 gap-3">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full ${index === activeSlide ? 'bg-indigo-700 w-6' : 'bg-gray-300'
              }`}
          />
        ))}
      </View>
    );
  };

  //configure if user is onboarded or not
  const handleGetStarted = async () => {
    await AsyncStorage.setItem('isOnboarded', 'true');
    router.navigate(SIGN_UP);
  };

  const handleSignIn = async () => {
    await AsyncStorage.setItem('isOnboarded', 'true');
    router.navigate(SIGN_IN);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-between px-6">
        {/* Logo */}
        <View className="py-12">
          <Image
            source={images.logo}
            className="w-52 h-24"
            resizeMode="contain"
          />
        </View>

        {/* Main content with FlatList */}
        <View className="flex-1 w-full justify-center -mt-4">
          {/* Using FlatList for the image */}
          <View className="h-[320px] w-full">
            <FlatList
              ref={flatListRef}
              data={slides}
              renderItem={renderSlideItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={width}
              decelerationRate="fast"
              snapToAlignment="center"
              keyExtractor={(item) => item.id}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                setActiveSlide(newIndex);
              }}
            />
            <Pagination />
          </View>

          {/* Text Content */}
          <View className="items-center px-6 mt-12">
            <Text className="text-2xl font-bold text-center">
              Never miss an opportunity
            </Text>
            <Text className="text-base text-center text-gray-700 mt-4 w-4/5">
              Easily find and connect with service providers on the go
            </Text>
          </View>
        </View>

        {/* Bottom Buttons */}
        <Animated.View entering={FadeInDown.delay(200).springify()} className={"w-full"}>
          <View className="w-full px-2 mb-8">
            <TouchableOpacity className="bg-primary-300 py-4 rounded-md w-full" onPress={handleGetStarted}>
              <Text className="text-white text-center font-semibold text-lg">Get started</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-600 text-base">Already have an account? </Text>
              <TouchableOpacity onPress={handleSignIn}>
                <Text className="text-primary-300 font-semibold text-base">Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}