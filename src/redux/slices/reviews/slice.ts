import { AxiosResponse } from 'axios'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosInstance } from '@shared/axios'
import { Status } from '@shared/status'

import { sortTags } from '@utils/sort-tags'
import { toReviewsAndTagsArray } from '@utils/to-reviews-and-tags-array'

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
	reviews: [] as Review[],
	tagsSorting: 'desc',
	tags: [] as Tag[],
}

const reviewsSlice = createSlice({
	name: 'reviewsSlice',
	initialState,
	reducers: {
		sortTags: (state, action: { payload: { isDesc: boolean } }) => {
			state.tags = sortTags(state.tags, action.payload.isDesc)
			state.tagsSorting = action.payload.isDesc ? 'desc' : 'asc'
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchReviews.pending, (state) => {
			state.status = Status.LOADING
			state.message = ''
			state.reviews = [] as Review[]
			state.tags = [] as Tag[]
		})
		builder.addCase(fetchReviews.rejected, (state, action) => {
			state.status = Status.ERROR
			state.message = action.error.message as string
			state.reviews = [] as Review[]
			state.tags = [] as Tag[]
		})
		builder.addCase(fetchReviews.fulfilled, (state, action) => {
			state.reviews = action.payload.reviews
			state.tags = sortTags(action.payload.tags, state.tagsSorting === 'desc')
			state.message = ''
			state.status = Status.SUCCESS
		})
	},
})

export const reviewsReducer = reviewsSlice.reducer
// export const {} = reviewsSlice.actions
