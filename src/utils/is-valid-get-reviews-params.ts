import { CarBody, CarBrand, CarModel } from '@entities/car.types'

type IsValidGetReviewsParam = {
	keyword: string
	brand: CarBrand[]
	model: CarModel[]
	body: CarBody[]
	synonyms: string[]
	isLoading: boolean
}

export const isValidGetReviewsParams = ({
	keyword,
	brand,
	model,
	body,
	synonyms,
	isLoading,
}: IsValidGetReviewsParam) => {
	let message = ''

	// Don't use !keyword, because !0 will be true, and we don't want that

	if (keyword === '') message = 'Введите ключевое слово'
	else if (!brand.length) message = 'Выберите марку автомобиля'
	else if (!model.length) message = 'Выберете модель автомобиля'
	else if (!body.length) message = 'Выберите корпус автомобиля'
	else if (!synonyms.length) message = 'Выберите синонимы'
	else if (isLoading) message = 'Загрузка...'

	return {
		message: message || 'Получить отзывы',
		isValid: message === '',
	}
}
