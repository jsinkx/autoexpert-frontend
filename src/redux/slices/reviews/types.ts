import { Status } from '@shared/status'

import { CarBody, CarBrand, CarModel } from '@entities/car.types'
import { Review, ReviewAdjective, ReviewId, ReviewKeyWord } from '@entities/review.types'
import { SiteSource } from '@entities/site-sources.types'
import { Tag } from '@entities/tag.types'

// API

// Now in use only 1 word, 1 brand and 1 model
export type PostReviewsRequest = {
	words: string[]
	marks: CarBrand[]
	models: CarModel[]
	body_types: CarBody[]
}

export type PostReviewsResponse = {
	[key: ReviewId]: {
		adjectives: {
			key_word: ReviewKeyWord
			adjective: ReviewAdjective
			_id: string
		}[]
		text: {
			text: string
			mark: CarBrand
			model: CarModel
			link: string // Origin URL to this review
			body_type: CarBody
			source: string // Site name
			text_sentiment: { label: string; score: number }
		}
	}
}

// Thunks
export type FetchAdjectivesParams = PostReviewsRequest
export type FetchAdjectivesResult = {
	reviews: Review[]
	tags: Tag[]
}

// Initial state
export type ReviewsSliceInitialState = {
	status: Status
	message: string
	currentSiteSources: SiteSource[]
	reviewsSorting: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | ''
	currentReviewsScores: string[]
	_reviews: Review[]
	reviews: Review[]
	countReviewsByScore: {
		POSITIVE: number
		NEGATIVE: number
		NEUTRAL: number
		'': number
	}
	tagsSorting: 'asc' | 'desc'
	tags: Tag[]
	selectedTags: Tag[]
}
