import { AxiosResponse } from 'axios'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosInstance } from '@shared/axios'
import { Status } from '@shared/status'

import { toAvgCarScoresArray } from '@utils/converters/to-avg-car-scores-array'
import { toWordcloudArray } from '@utils/converters/to-wordcloud-array'

import {
	FetchAvgPersonalScoreParams,
	FetchAvgPersonalScoreResult,
	FetchWordcloudParams,
	FetchWordcloudResult,
	PostChartsAvgPersonalScoreRequest,
	PostChartsAvgPersonalScoreResponse,
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

// Slice

const initialState: ReviewsChartsInitialState = {
	status: Status.INIT,
	message: '',
	wordcloudData: [],
	avgCarScores: [],
}

const reviewsChartsSlice = createSlice({
	name: 'reviewsCharts',
	initialState,
	reducers: {},
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
	},
})

export const reviewChartsReducer = reviewsChartsSlice.reducer
