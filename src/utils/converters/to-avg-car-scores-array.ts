import { PostChartsAvgPersonalScoreResponse } from '@redux/slices/reviewsCharts/types'

export const toAvgCarScoresArray = (data: PostChartsAvgPersonalScoreResponse) =>
	data.map(([name, score]) => ({
		name,
		score,
	}))
