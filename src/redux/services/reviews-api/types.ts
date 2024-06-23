import { CarBrand, CarModel } from '@entities/car.types'

export type PostAddReviewRequest = {
	text: string
	mark: CarBrand
	model: CarModel
	link: string
	body_type: string
	other_data: {}
}

export type PostAddReviewResponse = {
	msg: string
	adj_count: number
	text_id: string
}
