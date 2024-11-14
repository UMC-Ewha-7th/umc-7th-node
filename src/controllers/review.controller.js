
import * as reviewService from '../services/review.service.js';

export const getUserReviews = async (req, res) => {
  const { userId } = req.params;
  const { restaurantId } = req.query;

  try {
    const reviews = await reviewService.getUserReviews(userId, restaurantId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};