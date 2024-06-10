import { AxiosResponse } from 'axios'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosInstance } from '@shared/axios'
import { REVIEWS_SORTING_OPTIONS } from '@shared/reviews-sorting-options'
import { Status } from '@shared/status'

import { filterReviewsScores } from '@utils/filter-reviews-scores'
// import { filterReviewsSitesSources } from '@utils/filter-reviews-sites-sources'
import { sortReviews } from '@utils/sort-reviews'
import { sortTags } from '@utils/sort-tags'
import { toReviewsAndTagsArray } from '@utils/to-reviews-and-tags-array'

// eslint-disable-next-line
// import { store } from '@redux/store'
import { Review } from '@entities/review.types'
import { Tag } from '@entities/tag.types'

import {
	FetchAdjectivesParameters,
	FetchAdjectivesResult,
	GetReviewsRequest,
	GetReviewsResponse,
	ReviewsSliceInitialState,
} from './types'

export const fetchReviews = createAsyncThunk<FetchAdjectivesResult, FetchAdjectivesParameters>(
	'reviews/fetchReviews',
	async (params, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.post<
				GetReviewsResponse,
				AxiosResponse<GetReviewsResponse>,
				GetReviewsRequest
			>('/search/find_adj', params)

			return toReviewsAndTagsArray(data)
		} catch {
			const message = 'Произошла неизвестная ошибка'

			return rejectWithValue({ message })
		}
	},
)

const initialState: ReviewsSliceInitialState = {
	status: Status.INIT,
	message: '',
	reviewsSorting: '',
	currentReviewsScores: Object.keys(REVIEWS_SORTING_OPTIONS)!.slice(0, -1), // Remove last value with '', means all
	_reviews: [] as Review[], // Clean reviews, to return for this array after filters
	reviews: [] as Review[],
	tagsSorting: 'desc',
	tags: [] as Tag[],
}

const reviewsSlice = createSlice({
	name: 'reviewsSlice',
	initialState,
	reducers: {
		setReviewsScores: (state, action: { payload: string[] }) => {
			state.currentReviewsScores = action.payload
		},
		setReviewsSorting: (state, action: { payload: { score: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | '' } }) => {
			state.reviews = sortReviews(state.reviews, action.payload.score)
			state.reviewsSorting = action.payload.score
		},
		setTagsSorting: (state, action: { payload: { isDesc: boolean } }) => {
			state.tags = sortTags(state.tags, action.payload.isDesc)
			state.tagsSorting = action.payload.isDesc ? 'desc' : 'asc'
		},
		applyReviewsSettings: (state) => {
			// FIXME: fix cycle dependency
			// const siteSources = store.getState().cars.siteSources

			const filteredReviewsScores = filterReviewsScores(state._reviews, state.currentReviewsScores)
			// const filteredReviewsSiteSources = filterReviewsSitesSources(filteredReviewsScores, siteSources)

			state.reviews = filteredReviewsScores
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchReviews.pending, (state) => {
			state.status = Status.LOADING
			state.message = ''
			state._reviews = [] as Review[]
			state.reviews = [] as Review[]
			state.tags = [] as Tag[]
		})
		builder.addCase(fetchReviews.rejected, (state, action) => {
			state.status = Status.ERROR
			state.message = action.error.message as string
			state._reviews = [] as Review[]
			state.reviews = [] as Review[]
			state.tags = [] as Tag[]
		})
		builder.addCase(fetchReviews.fulfilled, (state, action) => {
			const reviews = sortReviews(action.payload.reviews, state.reviewsSorting)

			state.reviews = reviews
			state._reviews = reviews
			state.tags = sortTags(action.payload.tags, state.tagsSorting === 'desc')
			state.message = ''
			state.status = Status.SUCCESS
		})
	},
})

export const reviewsReducer = reviewsSlice.reducer
export const { setReviewsScores, setReviewsSorting, setTagsSorting, applyReviewsSettings } =
	reviewsSlice.actions
