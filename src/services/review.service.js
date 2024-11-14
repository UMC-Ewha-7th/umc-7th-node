// src/services/review.service.js
import prisma from '../db.config.js';

export const getUserReviews = async (userId, restaurantId) => {
  const reviews = await prisma.review.findMany({
    where: {
      userId: parseInt(userId),
      ...(restaurantId && { restaurantId: parseInt(restaurantId) })
    },
    select: {
      id: true,
      restaurant: {
        select: {
          name: true
        }
      },
      rating: true,
      title: true,
      content: true,
      created_at: true,
      review_Photos: {
        select: {
          photoUrl: true
        }
      },
      reply: {
        select: {
          content: true
        }
      }
    }
  });

  return reviews.map(review => ({
    review_id: review.id,
    restaurant_name: review.restaurant.name,
    rating: review.rating,
    title: review.title,
    content: review.content,
    created_at: review.created_at,
    photos: review.reviewPhotos.map(photo => photo.photoUrl),
    owner_reply: review.reply ? review.reply.content : null
  }));
};
