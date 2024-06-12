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

import {
	Alert,
	Button,
	Checkbox,
	FormControl,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material'

import { CarBody, CarBrand, CarModel } from '@entities/car.types'

type CarParametersBrandProps = {}

export const CarParametersBrand: FC<CarParametersBrandProps> = () => {
	const dispatch = useDispatch()
	const asyncDispatch = useAppDispatch()

	const { cars, currentBrand, currentModel, currentBody } = useAppSelector(selectCarsState)

	const handleChangeCarBrand = (event: SelectChangeEvent<CarBrand[]>) => {
		const {
			target: { value },
		} = event

		const newCurrentBrands = typeof value === 'string' ? value.split(',') : value

		dispatch(setCurrentBrand(newCurrentBrands))
		dispatch(resetCurrentModel())
		dispatch(resetCurrentBody())
	}

	const handleChangeCarModel = (event: SelectChangeEvent<CarModel[]>) => {
		const {
			target: { value },
		} = event

		const newCurrentModels = typeof value === 'string' ? value.split(',') : value

		dispatch(setCurrentModel(newCurrentModels))
		dispatch(resetCurrentBody())
	}

	const handleChangeCaBody = (event: SelectChangeEvent<CarBody[]>) => {
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
			<p className="car-parameters__label"> Марка </p>
			<FormControl size="small" sx={{ width: '300px' }} className="car-parameters__input">
				<Select
					multiple
					value={currentBrand}
					onChange={handleChangeCarBrand}
					renderValue={(selected) => selected.join(', ')}
				>
					{carBrands.map((carBrand) => (
						<MenuItem key={carBrand} value={carBrand}>
							<ListItemIcon>
								<Checkbox checked={currentBrand.indexOf(carBrand) > -1} />
							</ListItemIcon>
							<ListItemText primary={carBrand} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{!!currentBrand.length && (
				<>
					<p className="car-parameters__label"> Модель </p>
					<FormControl size="small" sx={{ width: '300px' }} className="car-parameters__input">
						<Select
							multiple
							value={currentModel}
							onChange={handleChangeCarModel}
							renderValue={(selected) => selected.join(', ')}
						>
							{carModels.map((carModel) => (
								<MenuItem key={carModel} value={carModel}>
									<ListItemIcon>
										<Checkbox checked={currentModel.indexOf(carModel) > -1} />
									</ListItemIcon>
									<ListItemText primary={carModel} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</>
			)}
			{!!currentBrand.length && !!currentModel.length && (
				<>
					<p className="car-parameters__label"> Корпус </p>
					<FormControl size="small" sx={{ width: '300px' }} className="car-parameters__input">
						<Select
							multiple
							value={currentBody}
							onChange={handleChangeCaBody}
							renderValue={(selected) => selected.join(', ')}
						>
							{carBodies.map((carBody) => (
								<MenuItem key={carBody} value={carBody}>
									<ListItemIcon>
										<Checkbox checked={currentBody.indexOf(carBody) > -1} />
									</ListItemIcon>
									<ListItemText primary={carBody} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</>
			)}
		</div>
	)
}
