import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosInstance } from '@shared/axios'
import { Status } from '@shared/status'

import { toCarsArray } from '@utils/to-cars-array'

import { Car, CarBody, CarBrand, CarModel } from '@entities/car.types'
import { SiteSource } from '@entities/site-sources.types'

import {
	CarsSliceInitialState,
	FetchCarParametersResult,
	FetchCarSynonymsParameters,
	FetchCarSynonymsResult,
	GetCarsResponse,
	GetSiteSourcesResponse,
	GetSynonymsResponse,
} from './types'

export const fetchCarParameters = createAsyncThunk<FetchCarParametersResult>(
	'cars/fetchCarParameters',
	async (_, { rejectWithValue }) => {
		try {
			const { data: dataCars } = await axiosInstance<GetCarsResponse>('/search/get_cars')
			const { data: dataSources } = await axiosInstance<GetSiteSourcesResponse>('/search/get_sources')

			const cars = toCarsArray(dataCars)

			return {
				cars: cars as Car[],
				siteSources: dataSources,
			}
		} catch {
			const message = 'Произошла неизвестная ошибка'

			return rejectWithValue({ message })
		}
	},
)

export const fetchCarSynonyms = createAsyncThunk<FetchCarSynonymsResult, FetchCarSynonymsParameters>(
	'cars/fetchCarSynonyms',
	async (keyword, { rejectWithValue }) => {
		try {
			const { data: dataSynonyms } = await axiosInstance.post<GetSynonymsResponse>(
				`/search/synonims?word=${keyword}`,
			)

			return dataSynonyms
		} catch {
			const message = 'Произошла неизвестная ошибка'

			return rejectWithValue({ message })
		}
	},
)

const initialState: CarsSliceInitialState = {
	statusCars: Status.INIT,
	statusSynonyms: Status.INIT,

	messageCars: '',
	messageSynonyms: '',

	// Get from API
	cars: [] as Car[],
	siteSources: [] as SiteSource[],
	synonyms: [] as string[],

	// Selected by user
	currentKeyword: '',
	currentBrand: null,
	currentModel: null,
	currentBody: null,
	currentSiteSources: [] as SiteSource[],
	currentSynonyms: [] as string[],
}

const carsSlice = createSlice({
	name: 'cars',
	initialState,
	reducers: {
		setCurrentKeyword(state, action: { payload: string }) {
			state.currentKeyword = action.payload
		},
		setCurrentBrand(state, action: { payload: CarBrand | null }) {
			state.currentBrand = action.payload
		},
		setCurrentModel(state, action: { payload: CarModel | null }) {
			state.currentModel = action.payload
		},
		setCurrentBody(state, action: { payload: CarBody | null }) {
			state.currentBody = action.payload
		},
		setCurrentSiteSources(state, action: { payload: SiteSource[] }) {
			state.currentSiteSources = action.payload
		},
		setSynonyms(state, action: { payload: string[] }) {
			state.synonyms = action.payload
			state.currentSynonyms = action.payload
		},
		setCurrentSynonyms(state, action: { payload: string[] }) {
			state.currentSynonyms = action.payload
		},
		resetCarsState(state) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			state = initialState
		},
	},
	extraReducers: (builder) => {
		// Fetch car parameters
		builder.addCase(fetchCarParameters.pending, (state) => {
			state.statusCars = Status.LOADING
			state.messageCars = ''
			state.cars = [] as Car[]
			state.siteSources = [] as SiteSource[]
		})
		builder.addCase(fetchCarParameters.rejected, (state, action) => {
			state.statusCars = Status.ERROR
			state.messageCars = action.error.message as string
			state.cars = [] as Car[]
			state.siteSources = [] as SiteSource[]
		})
		builder.addCase(fetchCarParameters.fulfilled, (state, action) => {
			state.statusCars = Status.SUCCESS
			state.messageCars = ''
			state.cars = action.payload.cars
			state.siteSources = action.payload.siteSources
			state.currentSiteSources = action.payload.siteSources
		})

		// Fetch car synonyms
		builder.addCase(fetchCarSynonyms.pending, (state) => {
			state.statusSynonyms = Status.LOADING
			state.messageSynonyms = ''
			state.synonyms = [] as string[]
			state.currentSynonyms = [] as string[]
		})
		builder.addCase(fetchCarSynonyms.rejected, (state, action) => {
			state.statusSynonyms = Status.ERROR
			state.messageSynonyms = action.error.message as string
			state.synonyms = [] as string[]
			state.currentSynonyms = [] as string[]
		})
		builder.addCase(fetchCarSynonyms.fulfilled, (state, action) => {
			state.statusSynonyms = Status.SUCCESS
			state.messageSynonyms = ''
			state.synonyms = action.payload
			state.currentSynonyms = action.payload
		})
	},
})

export const {
	setCurrentKeyword,
	setCurrentBrand,
	setCurrentModel,
	setCurrentBody,
	setCurrentSiteSources,
	resetCarsState,
	setCurrentSynonyms,
	setSynonyms,
} = carsSlice.actions
export const carsReducer = carsSlice.reducer