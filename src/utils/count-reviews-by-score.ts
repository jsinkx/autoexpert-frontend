import { Review } from '@entities/review.types'

export const countReviewsByScore = (reviews: Review[], score: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | '') => {
	return reviews.reduce((acc, review) => {
		if (review.score === score) {
			acc++
		}
		return acc
	}, 0)
}
