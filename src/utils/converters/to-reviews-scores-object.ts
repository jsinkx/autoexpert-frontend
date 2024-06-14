import { PostChartsSentimentResponse } from '@redux/slices/reviewsCharts/types'

export const toReviewsScoresObject = (data: PostChartsSentimentResponse) => {
	const reviewsScoresObject: { [key: string]: number } = {}

	data.forEach(([reviewScore, count]) => {
		reviewsScoresObject[reviewScore] = count
	})

	return reviewsScoresObject
}
