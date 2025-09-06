import React from 'react';
import { Text, View } from 'react-native';
import StarRating from './StarRating';
import { RatingStats } from './types';

interface CommentsHeaderProps {
  ratingStats: RatingStats;
}

const CommentsHeader: React.FC<CommentsHeaderProps> = ({ ratingStats }) => {
  const { averageRating, totalReviews } = ratingStats;

  return (
    <View className="px-4 py-6 mt-2">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-gray-900">
            Customer Reviews
          </Text>
          <View className="flex-row items-center mt-1">
            <StarRating rating={parseFloat(averageRating)} size={18} />
            <Text className="text-gray-600 ml-2">
              {averageRating} • {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommentsHeader;
