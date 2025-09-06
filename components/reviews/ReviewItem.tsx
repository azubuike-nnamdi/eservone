import React from 'react';
import { Text, View } from 'react-native';
import StarRating from './StarRating';
import { Review } from './types';
import { formatDate, getInitials, getRandomColor } from './utils';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const initials = getInitials(review.commentCreatedBy);
  const color = getRandomColor(review.commentCreatedBy);
  const formattedDate = formatDate(review.createdAt);

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
            {review.rating && (
              <View className="flex-row items-center bg-gray-50 px-2 py-1 rounded-full">
                <StarRating rating={review.rating} size={14} />
                <Text className="text-gray-700 font-semibold ml-1 text-xs">
                  {review.rating}
                </Text>
              </View>
            )}
          </View>

          <View className="flex-row items-center mb-3">
            <StarRating rating={review.rating || 0} size={14} />
            <Text className="text-gray-500 text-xs ml-2">
              {formattedDate}
            </Text>
          </View>

          <Text className="text-gray-800 text-sm leading-6">
            {review.content}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
