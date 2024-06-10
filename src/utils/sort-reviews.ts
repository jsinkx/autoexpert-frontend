import { Review } from '@entities/review.types'

export const sortReviews = (reviews: Review[], sortByScore: string) => {
	const filteredReviews = reviews.filter((review) => review.score === sortByScore)
	const otherReviews = reviews.filter((review) => review.score !== sortByScore)
	return [...filteredReviews, ...otherReviews]
}
