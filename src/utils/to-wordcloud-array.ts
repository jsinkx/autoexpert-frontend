import { PostChartsWordcloudResponse } from '@redux/slices/reviewsCharts/types'

export const toWordcloudArray = (data: PostChartsWordcloudResponse) =>
	data.map(([word, count]) => ({ text: word, value: count }))
