import { AxiosResponse } from 'axios'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosInstance } from '@shared/axios'
import { Status } from '@shared/status'

import { toWordcloudArray } from '@utils/to-wordcloud-array'

import {
	FetchWordcloudParams,
	FetchWordcloudResult,
	PostChartsWordcloudRequest,
	PostChartsWordcloudResponse,
	ReviewsChartsInitialState,
} from './types'

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

const initialState: ReviewsChartsInitialState = {
	status: Status.INIT,
	message: '',
	wordcloudData: [],
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
	},
})

export const reviewChartsReducer = reviewsChartsSlice.reducer
