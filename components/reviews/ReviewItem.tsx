import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { Review } from './types';
import { getInitials, getRandomColor } from './utils';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const initials = getInitials(review.commentCreatedBy.toString());
  const color = getRandomColor(review.commentCreatedBy);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color="#FCD34D" />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color="#FCD34D" />
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#D1D5DB" />
      );
    }

    return stars;
  };


  return (
    <View className="bg-white rounded-2xl p-5 mb-4 mx-4 shadow-sm border border-gray-100" style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    }}>
      <View className="flex-row items-start">
        {/* Profile Picture */}
        <View
          className="w-14 h-14 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: `${color}20` }}
        >
          <Text
            className="font-bold text-xl"
            style={{ color }}
          >
            {initials}
          </Text>
        </View>

        {/* Review Content */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-2">
            {review.commentCreatedBy && (
              <Text className="text-gray-700 font-semibold ml-1 text-xs">
                Commented by: {review.commentCreatedBy}
              </Text>
            )}
          </View>

          {/* Star Rating */}
          {review.rating !== null && (
            <View className="flex-row items-center mb-3">
              <View className="flex-row items-center">
                {renderStars(review.rating)}
              </View>
              <Text className="text-gray-500 text-xs ml-2">
                {review.rating}/5
              </Text>
            </View>
          )}

          <Text className="text-gray-800 text-sm leading-6">
            {review.content}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
