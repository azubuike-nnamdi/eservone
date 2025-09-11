import { Review } from '@/constants/types';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import ProviderReviewItem from './ProviderReviewItem';

interface ProviderReviewsListProps {
  reviews: Review[];
  businessName: string | null;
}

export default function ProviderReviewsList({ reviews, businessName }: ProviderReviewsListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <View className="items-center py-8">
        <Text className="text-gray-500 text-center text-lg">No reviews yet</Text>
        <Text className="text-gray-400 text-sm text-center mt-2">Be the first to review this provider</Text>
      </View>
    );
  }

  const renderReviewItem = ({ item, index }: { item: Review; index: number }) => (
    <ProviderReviewItem
      review={item}
      index={index}
      businessName={businessName}
    />
  );

  return (
    <FlatList
      data={reviews}
      renderItem={renderReviewItem}
      keyExtractor={(item, index) => `review-${item.commentCreatedBy}-${index}`}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      contentContainerStyle={{ paddingBottom: 20 }}
      ItemSeparatorComponent={() => <View className="h-2" />}
    />
  );
}
