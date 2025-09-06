import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import StarRating from './StarRating';
import { RatingStats } from './types';

interface RatingSummaryProps {
  ratingStats: RatingStats;
  ratingCount: number; // This is now the average rating
}

const RatingSummary: React.FC<RatingSummaryProps> = ({ ratingStats, ratingCount }) => {
  const { percentages, totalReviews } = ratingStats;

  return (
    <View className="bg-white mx-4 mt-6 rounded-2xl p-6" style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 3,
    }}>
      <View className="flex-row items-center justify-between mb-2">
        {/* Overall Rating */}
        <View className="items-center flex-1">
          <Text className="text-5xl font-bold text-indigo-700 mb-1">
            {ratingCount.toFixed(1)}
            <Text className="text-2xl text-gray-500">/5</Text>
          </Text>
          <View className="flex-row items-center mb-2">
            <StarRating rating={ratingCount} size={20} />
          </View>
          <Text className="text-gray-600 text-base">
            {totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}
          </Text>
        </View>

        {/* Separator */}
        <View className="h-24 w-px bg-gray-200 mx-2" />

        {/* Rating Distribution - Estimated from total rating count */}
        <View className="flex-1 ml-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <View key={rating} className="flex-row items-center mb-3">
              <View className="flex-row items-center w-8">
                <Text className="text-gray-700 font-medium text-sm">
                  {rating}
                </Text>
                <Ionicons name="star" size={14} color="#FFD700" className="ml-1" />
              </View>
              <View className="flex-1 mx-3">
                <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className="h-2 bg-indigo-500 rounded-full"
                    style={{ width: `${percentages[rating]}%` }}
                  />
                </View>
              </View>
              <Text className="text-gray-600 text-xs w-8 text-right">
                {percentages[rating]}%
              </Text>
            </View>
          ))}
          {totalReviews > 0 && (
            <Text className="text-gray-400 text-xs text-center mt-2">
              *Estimated distribution
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default RatingSummary;
