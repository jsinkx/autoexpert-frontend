export type CarBrand = string
export type CarModel = string
export type CarBody = string

export type Car = {
	brand: CarBrand
	models: {
		model: CarModel
		body: CarBody[]
	}[]
}
