import { Status } from '@shared/status'

import { AvgCarScore } from '@entities/avg-car-score.types'
import { CarBody, CarBrand, CarModel } from '@entities/car.types'
import { IndicatorItem } from '@entities/indicator-item.types'
import { ReviewScores } from '@entities/review-scores.types'
import { SiteSource } from '@entities/site-sources.types'
import { WordcloudWord } from '@entities/wordcloud-word.types'

type IndicatorComparison = {
	pros: IndicatorItem[]
	cons: IndicatorItem[]
}

// API

export type PostChartsWordcloudRequest = {
	words: string[]
	marks: CarBrand[]
	models: CarModel[]
	body_types: CarBody[]
	sentiments?: string[]
	sources?: SiteSource[]
}

export type PostChartsWordcloudResponse = [string, number][]

export type PostChartsAvgPersonalScoreRequest = {
	marks: CarBrand[]
	models: CarModel[]
	body_types: CarBody[]
	sentiments: string[]
}

export type PostChartsAvgPersonalScoreResponse = [string, number][]

export type PostChartsSentimentRequest = {
	marks: CarBrand[]
	models: CarModel[]
	body_types: CarBody[]
	sources: SiteSource[]
}

export type PostChartsSentimentResponse = [string, number][]

export type PostChartsProsConsRequest = {
	marks: CarBrand[]
	models: CarModel[]
	body_types: CarBody[]
}

export type PostChartsProsConsResponse = [string, number][]

// Thunks
export type FetchWordcloudParams = PostChartsWordcloudRequest

export type FetchWordcloudResult = WordcloudWord[]

export type FetchAvgPersonalScoreParams = PostChartsAvgPersonalScoreRequest

export type FetchAvgPersonalScoreResult = AvgCarScore[]

export type FetchReviewsScoresParams = PostChartsSentimentRequest

export type FetchReviewsScoresResult = ReviewScores

export type FetchIndicatorComparisonParams = PostChartsProsConsRequest
export type FetchIndicatorComparisonResult = IndicatorComparison

// Initial state

export type ReviewsChartsInitialState = {
	status: Status
	message: string
	wordcloudData: WordcloudWord[]
	avgCarScores: AvgCarScore[]
	reviewsScores: ReviewScores
	indicatorsComparison: IndicatorComparison
}
