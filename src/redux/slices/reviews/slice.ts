import { AxiosResponse } from 'axios'

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosInstance } from '@shared/axios'
import { REVIEWS_SORTING_OPTIONS } from '@shared/reviews-sorting-options'
import { Status } from '@shared/status'

import { toReviewsAndTagsArray } from '@utils/converters/to-reviews-and-tags-array'
import { countReviewsByScore } from '@utils/count-reviews-by-score'
import { filterReviewsByTags } from '@utils/filters/filter-reviews-by-tags'
import { filterReviewsScores } from '@utils/filters/filter-reviews-scores'
import { filterReviewsSitesSources } from '@utils/filters/filter-reviews-sites-sources'
import { sortReviews } from '@utils/sort/sort-reviews'
import { sortTags } from '@utils/sort/sort-tags'

import { Review } from '@entities/review.types'
import { SiteSource } from '@entities/site-sources.types'
import { Tag } from '@entities/tag.types'

import {
	FetchAdjectivesParams,
	FetchAdjectivesResult,
	PostReviewsRequest,
	PostReviewsResponse,
	ReviewsSliceInitialState,
} from './types'

// Thunks

export const fetchReviews = createAsyncThunk<FetchAdjectivesResult, FetchAdjectivesParams>(
	'reviews/fetchReviews',
	async (params, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.post<
				PostReviewsResponse,
				AxiosResponse<PostReviewsResponse>,
				PostReviewsRequest
			>('/search/find_adj', params)

			return toReviewsAndTagsArray(data)
		} catch {
			const message = 'Произошла неизвестная ошибка'

			return rejectWithValue({ message })
		}
	},
)

// Slice

const initialState: ReviewsSliceInitialState = {
	status: Status.INIT,
	message: '',
	currentSiteSources: ['auto.ru', 'avito', 'drom'],
	reviewsSorting: '',
	currentReviewsScores: Object.keys(REVIEWS_SORTING_OPTIONS)!.slice(0, -1), // Remove last value with '', means all
	_reviews: [] as Review[], // Clean reviews, to return for this array after filters
	reviews: [] as Review[],
	countReviewsByScore: {
		POSITIVE: 0,
		NEGATIVE: 0,
		NEUTRAL: 0,
		'': 0,
	},
	tagsSorting: 'desc',
	tags: [] as Tag[],
	selectedTags: [],
}

export const reviewsSlice = createSlice({
	name: 'reviewsSlice',
	initialState,
	reducers: {
		setCurrentSiteSources(state, action: PayloadAction<SiteSource[]>) {
			state.currentSiteSources = action.payload
		},
		setReviewsScores: (state, action: PayloadAction<string[]>) => {
			state.currentReviewsScores = action.payload
		},
		setReviewsSorting: (state, action: PayloadAction<{ score: '' | 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' }>) => {
			state.reviews = sortReviews(state.reviews, action.payload.score)
			state.reviewsSorting = action.payload.score
		},
		setTagsSorting: (state, action: PayloadAction<{ isDesc: boolean }>) => {
			state.tags = sortTags(state.tags, action.payload.isDesc)
			state.tagsSorting = action.payload.isDesc ? 'desc' : 'asc'
		},
		setSelectedTags: (state, action: PayloadAction<Tag>) => {
			const selectedTag = action.payload
			const selectedTags = state.selectedTags
			const selectedTagsIds = selectedTags.map((tagItem) => tagItem.id)

			let newSelectedTags = []

			if (selectedTagsIds.includes(selectedTag.id))
				newSelectedTags = selectedTags.filter((selectedTagItem) => selectedTagItem.id !== selectedTag.id)
			else newSelectedTags = [...selectedTags, selectedTag]

			state.selectedTags = newSelectedTags
		},
		applySelectedTags: (state) => {
			const selectedTags = state.selectedTags

			const filteredReviewsTags = !selectedTags.length
				? state.reviews
				: filterReviewsByTags(state.reviews, selectedTags)

			state.reviews = filteredReviewsTags
		},
		applyReviewsSettings: (state) => {
			const filteredReviewsScores = filterReviewsScores(state.reviews, state.currentReviewsScores)
			const filteredReviewsSiteSources = filterReviewsSitesSources(
				filteredReviewsScores,
				state.currentSiteSources,
			)

			state.reviews = filteredReviewsSiteSources
		},
		updateReviews: (state) => {
			const setReviewsSortingAction: PayloadAction<{ score: '' | 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' }> = {
				payload: {
					score: state.reviewsSorting,
				},
				type: 'reviewsSlice/setReviewsSorting',
			}

			state.reviews = state._reviews

			reviewsSlice.caseReducers.setReviewsSorting(state, setReviewsSortingAction)

			reviewsSlice.caseReducers.applySelectedTags(state)
			reviewsSlice.caseReducers.applyReviewsSettings(state)
		},
	},
	extraReducers: (builder) => {
		// Fetch reviews
		builder.addCase(fetchReviews.pending, (state) => {
			state.status = Status.LOADING
			state.message = ''
			state._reviews = []
			state.reviews = []
			state.tags = []
		})
		builder.addCase(fetchReviews.rejected, (state, action) => {
			state.status = Status.ERROR
			state.message = action.error.message as string
			state._reviews = []
			state.reviews = []
			state.tags = []
			state.selectedTags = []
			state.selectedTags = []
		})
		builder.addCase(fetchReviews.fulfilled, (state, action) => {
			const reviews = sortReviews(action.payload.reviews, state.reviewsSorting)

			state.reviews = reviews
			state._reviews = reviews
			state.countReviewsByScore = {
				POSITIVE: countReviewsByScore(reviews, 'POSITIVE'),
				NEGATIVE: countReviewsByScore(reviews, 'NEGATIVE'),
				NEUTRAL: countReviewsByScore(reviews, 'NEUTRAL'),
				'': reviews.length,
			}
			state.tags = sortTags(action.payload.tags, state.tagsSorting === 'desc')
			state.selectedTags = []
			state.message = ''
			state.status = Status.SUCCESS
		})
	},
})

export const reviewsReducer = reviewsSlice.reducer
export const {
	setCurrentSiteSources,
	setReviewsScores,
	setReviewsSorting,
	setTagsSorting,
	setSelectedTags,
	applySelectedTags,
	applyReviewsSettings,
	updateReviews,
} = reviewsSlice.actions
