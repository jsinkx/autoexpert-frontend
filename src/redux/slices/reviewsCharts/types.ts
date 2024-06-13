import { Status } from '@shared/status'

import { AvgCarScore } from '@entities/avg-car-score.types'
import { CarBody, CarBrand, CarModel } from '@entities/car.types'
import { SiteSource } from '@entities/site-sources.types'
import { WordcloudWord } from '@entities/wordcloud-word.types'

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

// Thunks
export type FetchWordcloudParams = PostChartsWordcloudRequest

export type FetchWordcloudResult = WordcloudWord[]

export type FetchAvgPersonalScoreParams = PostChartsAvgPersonalScoreRequest

export type FetchAvgPersonalScoreResult = AvgCarScore[]

// Initial state

export type ReviewsChartsInitialState = {
	status: Status
	message: string
	wordcloudData: WordcloudWord[]
	avgCarScores: AvgCarScore[]
}
