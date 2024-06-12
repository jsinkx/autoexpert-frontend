import { Status } from '@shared/status'

import { Car, CarBody, CarBrand, CarModel } from '@entities/car.types'
import { SiteSource } from '@entities/site-sources.types'

// API

export type GetCarsResponse = {
	[key: CarBrand]: {
		[key: CarModel]: CarBody[]
	}
}

export type GetSiteSourcesResponse = SiteSource[]

export type GetSynonymsResponse = string[]

// Thunks

export type FetchCarParametersResult = {
	cars: Car[]
	siteSources: GetSiteSourcesResponse
}

export type FetchCarSynonymsParameters = string
export type FetchCarSynonymsResult = string[]

// Initial state

export type CarsSliceInitialState = {
	statusCars: Status
	statusSynonyms: Status

	messageCars: string
	messageSynonyms: string

	// Get from API
	cars: Car[]
	synonyms: string[]
	siteSources: SiteSource[]

	// Selected by user
	currentKeyword: string
	currentBrand: CarBrand[]
	currentModel: CarModel[]
	currentBody: CarBrand[]
	currentSiteSources: SiteSource[]
	currentSynonyms: string[]
}
