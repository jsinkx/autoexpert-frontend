import { CarBody, CarBrand, CarModel } from '@entities/car.types'

export const isValidGetReviewsParams = (
	keyword: string,
	brand: CarBrand | null,
	model: CarModel | null,
	body: CarBody | null,
	synonyms: string[],
) => {
	let message = ''

	// Don't use !keyword, because !0 will be true, and we don't want that

	if (keyword === '') message = 'Введите ключевое слово'
	else if (brand === '' || brand === null) message = 'Выберите марку автомобиля'
	else if (model === '' || model === null) message = 'Выберете модель автомобиля'
	else if (body === '' || body === null) message = 'Выберите корпус автомобиля'
	else if (!synonyms.length) message = 'Выберите синонимы'

	return {
		message: message || 'Получить отзывы',
		isValid: message === '',
	}
}
