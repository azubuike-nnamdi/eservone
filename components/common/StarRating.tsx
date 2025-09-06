import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

interface StarRatingProps {
  rating: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  showHalfStars?: boolean;
}

/**
 * Component for rendering star ratings with proper half-star support
 */
const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 20,
  activeColor = "#3E3F93",
  inactiveColor = "#D1D5DB",
  showHalfStars = true
}) => {
  const renderStars = () => {
    const stars = [];
    const numericRating = typeof rating === 'number' ? rating : 0;
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = showHalfStars && numericRating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full stars
        stars.push(
          <Ionicons key={i} name="star" size={size} color={activeColor} />
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star - Ionicons has proper half-star support
        stars.push(
          <Ionicons key={i} name="star-half" size={size} color={activeColor} />
        );
      } else {
        // Empty stars
        stars.push(
          <Ionicons key={i} name="star-outline" size={size} color={inactiveColor} />
        );
      }
    }
    return stars;
  };

  return (
    <View className="flex-row items-center justify-center gap-1">
      {renderStars()}
    </View>
  );
};

export default StarRating;
