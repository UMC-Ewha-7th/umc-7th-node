import {
    addReview,
    getReview,
    attachReviewPhoto,
    getReviewImagesByReviewId,
} from "../repositories/review.repository.js";
import { responseAddReview } from "../dtos/review.dto.js";

export const writeReview = async (data) => {
    const joinReviewId = await addReview({
        memberId: data.memberId,
        storeId: data.storeId,
        reviewBody: data.reviewBody,
        rating: data.rating,
    });

    if (joinReviewId === null) {
        throw new Error("이미 존재하는 가게입니다.");
    }
    const review = await getReview(joinReviewId);
    const storeId = data.storeId;
    const memberId = data.memberId;
    

    console.log("리뷰: ", review);
    for (const reviewImage of data.reviewImages) {
        await attachReviewPhoto(review.id, storeId, reviewImage);
    }

    const reviewImages = await getReviewImagesByReviewId(review.id);
    console.log("리뷰 이미지: ", reviewImages);

    return responseAddReview({ review, storeId, memberId, reviewImages });
};