import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { selectCarsState } from '@redux/slices/cars/selectors'
import {
	fetchCarParameters,
	resetCurrentBody,
	resetCurrentModel,
	setCurrentBody,
	setCurrentBrand,
	setCurrentModel,
} from '@redux/slices/cars/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { Input } from '@components/Input/Input'

import { Alert, Button, SelectChangeEvent } from '@mui/material'

import { CarBody, CarBrand, CarModel } from '@entities/car.types'

type CarParametersBrandProps = {}

export const CarParametersBrand: FC<CarParametersBrandProps> = () => {
	const dispatch = useDispatch()
	const asyncDispatch = useAppDispatch()

	const { cars, currentBrand, currentModel, currentBody } = useAppSelector(selectCarsState)

	const handleChangeCarBrand = (event: SelectChangeEvent<CarBrand | CarBrand[]>) => {
		const {
			target: { value },
		} = event

		const newCurrentBrands = typeof value === 'string' ? value.split(',') : value

		dispatch(setCurrentBrand(newCurrentBrands))
		dispatch(resetCurrentModel())
		dispatch(resetCurrentBody())
	}

	const handleChangeCarModel = (event: SelectChangeEvent<CarModel | CarModel[]>) => {
		const {
			target: { value },
		} = event

		const newCurrentModels = typeof value === 'string' ? value.split(',') : value

		dispatch(setCurrentModel(newCurrentModels))
		dispatch(resetCurrentBody())
	}

	const handleChangeCaBody = (event: SelectChangeEvent<CarBody | CarBody[]>) => {
		const {
			target: { value },
		} = event

		const newCurrentBodies = typeof value === 'string' ? value.split(',') : value

		dispatch(setCurrentBody(newCurrentBodies))
	}

	const refetchCarParameters = () => {
		asyncDispatch(fetchCarParameters())
	}

	const carBrands = cars.map((car) => car.brand) // Getting array with only brand names (strings)
	const selectedCars = cars.filter((car) => currentBrand.includes(car.brand)) // Getting cars by selected brands
	const carModels = selectedCars
		.map((selectedCar) => selectedCar.models)
		.flat()
		.map((model) => model.model)

	const carBodies = Array.from(
		new Set(
			selectedCars
				.map((selectedCar) => selectedCar.models)
				.flat()
				.map((model) => model.body)
				.flat(),
		),
	)

	if (!cars.length)
		return (
			<Alert severity="error" className="car-parameter__error">
				Не удалось получить автомобили <Button onClick={refetchCarParameters}> обновить </Button>
			</Alert>
		)

	return (
		<div className="car-parameters">
			<Input
				isSelect
				multiple
				selectValues={carBrands}
				selectedValues={currentBrand}
				value={currentBrand}
				onChange={handleChangeCarBrand}
				label="Марка"
				className="car-parameters__input"
			/>
			{!!currentBrand.length && (
				<Input
					isSelect
					multiple
					selectValues={carModels}
					selectedValues={currentModel}
					value={currentModel}
					onChange={handleChangeCarModel}
					label="Модель"
					className="car-parameters__input"
				/>
			)}
			{!!currentBrand.length && !!currentModel.length && (
				<Input
					isSelect
					multiple
					selectValues={carBodies}
					selectedValues={currentBody}
					value={currentBody}
					onChange={handleChangeCaBody}
					label="Корпус"
					className="car-parameters__input"
				/>
			)}
		</div>
	)
}
