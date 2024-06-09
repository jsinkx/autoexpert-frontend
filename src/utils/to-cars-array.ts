import { GetCarsResponse } from '@redux/slices/cars/types'

import { CarBody, CarBrand, CarModel } from '@entities/car.types'

const getCarBody = (data: GetCarsResponse) => (carBrand: CarBrand, carModel: CarModel) =>
	data[carBrand]?.[carModel] || []

const getCarModels = (data: GetCarsResponse) => (carBrand: CarBrand) =>
	Object.keys(data[carBrand] || {}).map((carModel) => ({
		model: carModel as CarModel,
		body: getCarBody(data)(carBrand, carModel) as CarBody[],
	}))

export const toCarsArray = (data: GetCarsResponse) => {
	return Object.keys(data).map((carBrand) => ({
		brand: carBrand as CarBrand,
		models: getCarModels(data)(carBrand),
	}))
}
