import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { axiosInstance } from '@shared/axios'
import { Status } from '@shared/status'

import { toCarsArray } from '@utils/converters/to-cars-array'

import { Car, CarBody, CarBrand, CarModel } from '@entities/car.types'
import { SiteSource } from '@entities/site-sources.types'

import {
	CarsSliceInitialState,
	FetchCarParametersResult,
	FetchCarSynonymsParameters,
	FetchCarSynonymsResult,
	GetCarsResponse,
	GetSiteSourcesResponse,
	PostSynonymsResponse,
} from './types'

// Thunks

export const fetchCarParameters = createAsyncThunk<FetchCarParametersResult>(
	'cars/fetchCarParameters',
	async (_, { rejectWithValue }) => {
		try {
			const { data: dataCars } = await axiosInstance<GetCarsResponse>('/vars/get_cars')
			const { data: dataSources } = await axiosInstance<GetSiteSourcesResponse>('/vars/get_sources')

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
			const { data: dataSynonyms } = await axiosInstance.post<PostSynonymsResponse>(
				`/search/synonims?word=${keyword}`,
			)

			return dataSynonyms
		} catch {
			const message = 'Произошла неизвестная ошибка'

			return rejectWithValue({ message })
		}
	},
)

// Slice

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
	currentBrand: [],
	currentModel: [],
	currentBody: [],
	currentSiteSources: [] as SiteSource[],
	currentSynonyms: [] as string[],
}

export const carsSlice = createSlice({
	name: 'cars',
	initialState,
	reducers: {
		setCurrentKeyword(state, action: PayloadAction<string>) {
			state.statusSynonyms = Status.LOADING
			state.currentKeyword = action.payload
			state.synonyms = []
			state.currentSynonyms = []
		},
		setCurrentBrand(state, action: PayloadAction<CarBrand[]>) {
			state.currentBrand = action.payload
		},

		setCurrentModel(state, action: PayloadAction<CarModel[]>) {
			state.currentModel = action.payload
		},

		setCurrentBody(state, action: PayloadAction<CarBody[]>) {
			state.currentBody = action.payload
		},
		resetCurrentBrand(state) {
			state.currentBrand = []
		},
		resetCurrentModel(state) {
			state.currentModel = []
		},
		resetCurrentBody(state) {
			state.currentBody = []
		},
		setCurrentSiteSources(state, action: PayloadAction<SiteSource[]>) {
			state.currentSiteSources = action.payload
		},
		setSynonyms(state, action: PayloadAction<string[]>) {
			state.synonyms = action.payload
			state.currentSynonyms = action.payload
		},
		setCurrentSynonyms(state, action: PayloadAction<string[]>) {
			state.currentSynonyms = action.payload
		},
		resetCarsState: () => initialState,
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
	resetCurrentBrand,
	resetCurrentModel,
	resetCurrentBody,
	setCurrentSiteSources,
	resetCarsState,
	setCurrentSynonyms,
	setSynonyms,
} = carsSlice.actions
export const carsReducer = carsSlice.reducer
