import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

interface RatingStarsProps {
  ratingCount: number;
  size?: number;
  color?: string;
  emptyColor?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  ratingCount,
  size = 16,
  color = '#FFD700',
  emptyColor = '#D1D5DB'
}) => {
  const maxStars = 5;
  const filledStars = Math.min(ratingCount, maxStars);

  return (
    <View className="flex-row">
      {Array.from({ length: maxStars }, (_, index) => (
        <MaterialIcons
          key={index}
          name="star"
          size={size}
          color={index < filledStars ? color : emptyColor}
          style={{ marginRight: 1 }}
        />
      ))}
    </View>
  );
};

export default RatingStars; 