/**
 * Calculates the average rating from total rating count and review count
 * @param ratingCount - Total sum of all ratings
 * @param reviewCount - Total number of reviews
 * @returns Average rating rounded to 1 decimal place
 */
export const calculateAverageRating = (ratingCount: number, reviewCount: number): number => {
  if (!reviewCount || reviewCount === 0) {
    return 0;
  }

  const average = ratingCount / reviewCount;
  return Math.round(average * 10) / 10; // Round to 1 decimal place
};

/**
 * Formats rating for display
 * @param rating - The rating value
 * @returns Formatted rating string
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};
