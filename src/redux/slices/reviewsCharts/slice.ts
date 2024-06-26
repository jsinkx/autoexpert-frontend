import { AxiosResponse } from 'axios'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosInstance } from '@shared/axios'
import { Status } from '@shared/status'

import { toAvgCarScoresArray } from '@utils/converters/to-avg-car-scores-array'
import { toIndicatorItemArray } from '@utils/converters/to-indicator-item-array'
import { toReviewsScoresObject } from '@utils/converters/to-reviews-scores-object'
import { toWordcloudArray } from '@utils/converters/to-wordcloud-array'

import {
	FetchAvgPersonalScoreParams,
	FetchAvgPersonalScoreResult,
	FetchIndicatorComparisonParams,
	FetchIndicatorComparisonResult,
	FetchReviewsScoresParams,
	FetchReviewsScoresResult,
	FetchWordcloudParams,
	FetchWordcloudResult,
	PostChartsAvgPersonalScoreRequest,
	PostChartsAvgPersonalScoreResponse,
	PostChartsProsConsRequest,
	PostChartsProsConsResponse,
	PostChartsSentimentRequest,
	PostChartsSentimentResponse,
	PostChartsWordcloudRequest,
	PostChartsWordcloudResponse,
	ReviewsChartsInitialState,
} from './types'

// Thunks

export const fetchWordcloud = createAsyncThunk<FetchWordcloudResult, FetchWordcloudParams>(
	'fetchWordcloud',
	async (params, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.post<
				PostChartsWordcloudResponse,
				AxiosResponse<PostChartsWordcloudResponse>,
				PostChartsWordcloudRequest
			>('/charts/word_cloud', params)

			return toWordcloudArray(data)
		} catch {
			const message = 'Произошла неизвестная ошибка'

			return rejectWithValue({ message })
		}
	},
)

export const fetchAvgCarScores = createAsyncThunk<FetchAvgPersonalScoreResult, FetchAvgPersonalScoreParams>(
	'fetchAvgCarScore',
	async (params, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.post<
				PostChartsAvgPersonalScoreResponse,
				AxiosResponse<PostChartsAvgPersonalScoreResponse>,
				PostChartsAvgPersonalScoreRequest
			>('/charts/avg_personal_score_chart', params)

			return toAvgCarScoresArray(data)
		} catch {
			const message = 'Произошла неизвестная ошибка'

			return rejectWithValue({ message })
		}
	},
)

export const fetchReviewsScores = createAsyncThunk<FetchReviewsScoresResult, FetchReviewsScoresParams>(
	'fetchReviewsScores',
	async (params, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.post<
				PostChartsSentimentResponse,
				AxiosResponse<PostChartsSentimentResponse>,
				PostChartsSentimentRequest
			>(`/charts/sentiment_chart?skip_bad_sentiments=true`, params)

			return toReviewsScoresObject(data)
		} catch {
			const message = 'Произошла неизвестная ошибка'

			return rejectWithValue({ message })
		}
	},
)

export const fetchIndicatorsComparison = createAsyncThunk<
	FetchIndicatorComparisonResult,
	FetchIndicatorComparisonParams
>('fetchIndicatorsComparison', async (params, { rejectWithValue }) => {
	try {
		const { data: dataCons } = await axiosInstance.post<
			PostChartsProsConsResponse,
			AxiosResponse<PostChartsProsConsResponse>,
			PostChartsProsConsRequest
		>(`/charts/cons_chart`, params)

		const { data: dataPros } = await axiosInstance.post<
			PostChartsProsConsResponse,
			AxiosResponse<PostChartsProsConsResponse>,
			PostChartsProsConsRequest
		>(`/charts/pros_chart`, params)

		return {
			pros: toIndicatorItemArray(dataPros),
			cons: toIndicatorItemArray(dataCons),
		}
	} catch {
		const message = 'Произошла неизвестная ошибка'

		return rejectWithValue({ message })
	}
})

// Slice

const initialState: ReviewsChartsInitialState = {
	status: Status.INIT,
	message: '',
	wordcloudData: [],
	avgCarScores: [],
	reviewsScores: {},
	indicatorsComparison: { pros: [], cons: [] },
}

const reviewsChartsSlice = createSlice({
	name: 'reviewsCharts',
	initialState,
	reducers: {
		resetReviewsCharts: () => initialState,
	},
	extraReducers: (builder) => {
		// Fetch wordcloud
		builder.addCase(fetchWordcloud.pending, (state) => {
			state.status = Status.LOADING
			state.message = ''
			state.wordcloudData = []
		})
		builder.addCase(fetchWordcloud.rejected, (state, action) => {
			state.status = Status.ERROR
			state.message = action.error.message as string
			state.wordcloudData = []
		})
		builder.addCase(fetchWordcloud.fulfilled, (state, action) => {
			state.status = Status.SUCCESS
			state.message = ''
			state.wordcloudData = action.payload
		})
		// Fetch avg car scores
		builder.addCase(fetchAvgCarScores.pending, (state) => {
			state.status = Status.LOADING
			state.message = ''
			state.avgCarScores = []
		})
		builder.addCase(fetchAvgCarScores.rejected, (state, action) => {
			state.status = Status.ERROR
			state.message = action.error.message as string
			state.avgCarScores = []
		})
		builder.addCase(fetchAvgCarScores.fulfilled, (state, action) => {
			state.status = Status.SUCCESS
			state.message = ''
			state.avgCarScores = action.payload
		})
		// Fetch reviews scores
		builder.addCase(fetchReviewsScores.pending, (state) => {
			state.status = Status.LOADING
			state.message = ''
			state.reviewsScores = {}
		})
		builder.addCase(fetchReviewsScores.rejected, (state, action) => {
			state.status = Status.ERROR
			state.message = action.error.message as string
			state.reviewsScores = {}
		})
		builder.addCase(fetchReviewsScores.fulfilled, (state, action) => {
			state.status = Status.SUCCESS
			state.message = ''
			state.reviewsScores = action.payload
		})
		// Fetch indicators comparison
		builder.addCase(fetchIndicatorsComparison.pending, (state) => {
			state.status = Status.LOADING
			state.message = ''
			state.indicatorsComparison = { pros: [], cons: [] }
		})
		builder.addCase(fetchIndicatorsComparison.rejected, (state, action) => {
			state.status = Status.ERROR
			state.message = action.error.message as string
			state.indicatorsComparison = { pros: [], cons: [] }
		})
		builder.addCase(fetchIndicatorsComparison.fulfilled, (state, action) => {
			state.status = Status.SUCCESS
			state.message = ''
			state.indicatorsComparison = action.payload
		})
	},
})

export const reviewChartsReducer = reviewsChartsSlice.reducer

export const { resetReviewsCharts } = reviewsChartsSlice.actions
