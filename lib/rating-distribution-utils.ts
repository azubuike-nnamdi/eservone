/**
 * Utility functions for estimating rating distribution when individual ratings aren't available
 */

interface RatingDistribution {
  [key: number]: number; // rating -> percentage
}

interface ActualDistribution {
  counts: { [key: number]: number }; // rating -> count
  percentages: { [key: number]: number }; // rating -> percentage
}

interface Review {
  rating: number;
  [key: string]: any;
}

/**
 * Estimates rating distribution based on total rating count and review count
 * This is a heuristic approach when individual ratings aren't available
 */
export const estimateRatingDistribution = (
  totalRatingCount: number,
  reviewCount: number
): RatingDistribution => {
  if (reviewCount === 0) {
    return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  }

  const averageRating = totalRatingCount / reviewCount;

  // Create a distribution based on the average rating
  const distribution: RatingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  if (averageRating >= 4.5) {
    // High ratings: mostly 5s with some 4s
    distribution[5] = Math.round(70 + (averageRating - 4.5) * 20);
    distribution[4] = 100 - distribution[5];
  } else if (averageRating >= 3.5) {
    // Good ratings: mix of 4s and 5s
    distribution[5] = Math.round(30 + (averageRating - 3.5) * 40);
    distribution[4] = Math.round(40 + (4.5 - averageRating) * 20);
    distribution[3] = 100 - distribution[5] - distribution[4];
  } else if (averageRating >= 2.5) {
    // Average ratings: mix of 3s, 4s, and some 5s
    distribution[5] = Math.round(10 + (averageRating - 2.5) * 20);
    distribution[4] = Math.round(20 + (averageRating - 2.5) * 20);
    distribution[3] = Math.round(40 + (3.5 - averageRating) * 20);
    distribution[2] = 100 - distribution[5] - distribution[4] - distribution[3];
  } else if (averageRating >= 1.5) {
    // Low ratings: mostly 2s and 3s
    distribution[3] = Math.round(30 + (averageRating - 1.5) * 20);
    distribution[2] = Math.round(40 + (2.5 - averageRating) * 20);
    distribution[1] = 100 - distribution[3] - distribution[2];
  } else {
    // Very low ratings: mostly 1s and 2s
    distribution[2] = Math.round(20 + averageRating * 20);
    distribution[1] = 100 - distribution[2];
  }

  return distribution;
};

/**
 * Alternative: Create a more realistic distribution using weighted random sampling
 */
export const createRealisticDistribution = (
  totalRatingCount: number,
  reviewCount: number
): RatingDistribution => {
  if (reviewCount === 0) {
    return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  }

  const averageRating = totalRatingCount / reviewCount;
  const distribution: RatingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  // Create a more realistic distribution based on common rating patterns
  const variance = Math.min(0.5, Math.max(0.1, (5 - averageRating) / 10));

  // Distribute ratings around the average with some variance
  for (let i = 1; i <= 5; i++) {
    const distance = Math.abs(i - averageRating);
    const weight = Math.exp(-(distance * distance) / (2 * variance * variance));
    distribution[i] = Math.round(weight * 100);
  }

  // Normalize to ensure percentages add up to 100
  const total = Object.values(distribution).reduce((sum, val) => sum + val, 0);
  if (total > 0) {
    for (let i = 1; i <= 5; i++) {
      distribution[i] = Math.round((distribution[i] / total) * 100);
    }
  }

  return distribution;
};

/**
 * Simple approach: Assume all reviews have the same rating (the average)
 */
export const createUniformDistribution = (
  totalRatingCount: number,
  reviewCount: number
): RatingDistribution => {
  if (reviewCount === 0) {
    return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  }

  const averageRating = totalRatingCount / reviewCount;
  const distribution: RatingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  // Round to nearest whole number and put 100% there
  const roundedRating = Math.round(averageRating);
  distribution[roundedRating] = 100;

  return distribution;
};

/**
 * Calculates actual rating distribution from individual review data
 */
export const calculateActualDistribution = (reviews: Review[]): ActualDistribution => {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const percentages = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return { counts, percentages };
  }

  // Count each rating
  reviews.forEach(review => {
    const rating = review.rating;
    if (rating >= 1 && rating <= 5) {
      counts[rating as keyof typeof counts]++;
    }
  });

  // Calculate percentages
  for (let i = 1; i <= 5; i++) {
    percentages[i as keyof typeof percentages] = Math.round((counts[i as keyof typeof counts] / totalReviews) * 100);
  }

  return { counts, percentages };
};
