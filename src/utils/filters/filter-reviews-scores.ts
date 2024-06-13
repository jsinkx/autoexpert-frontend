import { Review } from '@entities/review.types'

export const filterReviewsScores = (reviews: Review[], scores: string[]) => {
	return reviews.filter((review) => {
		return scores.includes(review.score)
	})
}
