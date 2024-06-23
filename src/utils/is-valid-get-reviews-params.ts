import { CarBody, CarBrand, CarModel } from '@entities/car.types'

type IsValidGetReviewsParam = {
	keyword?: {
		value: string
		active: boolean
	}
	brand?: { value: CarBrand[]; active: boolean }
	model?: { value: CarModel[]; active: boolean }
	body?: { value: CarBody[]; active: boolean }
	synonyms?: { value: string[]; active: boolean }
	extra?: {
		value: string
		message: string
		isValid: (value: string) => boolean
	}[]
	isLoading: boolean
}

export const isValidGetReviewsParams = ({
	keyword,
	brand,
	model,
	body,
	synonyms,
	extra,
	isLoading,
}: IsValidGetReviewsParam) => {
	let message = ''

	// Don't use !keyword, because !0 will be true, and we don't want that

	if (keyword?.active && keyword.value === '') message = 'Введите ключевое слово'
	else if (brand?.active && !brand.value.length) message = 'Выберите марку автомобиля'
	else if (model?.active && !model.value.length) message = 'Выберете модель автомобиля'
	else if (body?.active && !body.value.length) message = 'Выберите корпус автомобиля'
	else if (synonyms?.active && !synonyms.value.length) message = 'Выберите синонимы'

	if (extra?.length) {
		extra.forEach(({ value, message: _message, isValid }) => {
			if (_message !== '' && !isValid(value)) message = _message
		})
	}

	if (isLoading) message = 'Загрузка...'

	return {
		message,
		isValid: message === '',
	}
}
