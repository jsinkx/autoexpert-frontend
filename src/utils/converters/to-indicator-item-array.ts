import { PostChartsProsConsResponse } from '@redux/slices/reviewsCharts/types'

export const toIndicatorItemArray = (data: PostChartsProsConsResponse) =>
	data.map((item) => ({ name: item[0], count: item[1] }))
