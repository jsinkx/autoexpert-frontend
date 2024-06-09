import { FC, SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'

import { selectCarsState } from '@redux/slices/cars/selectors'
import {
	fetchCarParameters,
	setCurrentBody,
	setCurrentBrand,
	setCurrentModel,
} from '@redux/slices/cars/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { Alert, Autocomplete, Button, TextField } from '@mui/material'

type CarParametersBrandProps = {}

export const CarParametersBrand: FC<CarParametersBrandProps> = () => {
	const dispatch = useDispatch()
	const asyncDispatch = useAppDispatch()

	const { cars, currentBrand, currentModel, currentBody } = useAppSelector(selectCarsState)

	const handleChangeCarBrand = (_: SyntheticEvent<Element, Event>, value: string | null) => {
		dispatch(setCurrentBrand(value))
		dispatch(setCurrentModel(null))
		dispatch(setCurrentBody(null))
	}

	const handleChangeCarModel = (_: SyntheticEvent<Element, Event>, value: string | null) => {
		dispatch(setCurrentModel(value))
		dispatch(setCurrentBody(null))
	}

	const handleChangeCarBody = (_: SyntheticEvent<Element, Event>, value: string | null) => {
		dispatch(setCurrentBody(value))
	}

	const refetchCarParameters = () => {
		asyncDispatch(fetchCarParameters())
	}

	const carBrands = cars.map((car) => car.brand)
	const selectedCar = cars.filter((car) => car.brand === currentBrand)[0]
	const carModels = selectedCar?.models.map((model) => model.model) || []
	const selectedCarModel = selectedCar?.models.filter((model) => model.model === currentModel)[0]
	const carBody = selectedCarModel?.body || []

	if (!cars.length)
		return (
			<Alert severity="error" className="car-parameter__error">
				Не удалось получить автомобили <Button onClick={refetchCarParameters}> обновить </Button>
			</Alert>
		)

	return (
		<div className="car-parameters">
			<p className="car-parameters__label"> Марка </p>
			<Autocomplete
				isOptionEqualToValue={(option, value) => option === value}
				options={carBrands}
				value={currentBrand}
				onChange={handleChangeCarBrand}
				renderInput={(params) => {
					// @ts-ignore
					return <TextField {...params} size="small" placeholder="Марка" />
				}}
				sx={{ width: 300 }}
				className="car-parameters__input"
			/>
			{!!currentBrand && (
				<>
					<p className="car-parameters__label"> Модель </p>
					<Autocomplete
						options={carModels}
						value={currentModel}
						onChange={handleChangeCarModel}
						isOptionEqualToValue={(option, value) => option === value}
						renderInput={(params) => {
							// @ts-ignore
							return <TextField {...params} size="small" placeholder="Модель" />
						}}
						sx={{ width: 300 }}
						className="car-parameters__input"
					/>
				</>
			)}
			{!!currentBrand && !!currentModel && (
				<>
					<p className="car-parameters__label"> Корпус </p>
					<Autocomplete
						options={carBody}
						value={currentBody}
						onChange={handleChangeCarBody}
						isOptionEqualToValue={(option, value) => option === value}
						renderInput={(params) => {
							// @ts-ignore
							return <TextField {...params} size="small" placeholder="Корпус" />
						}}
						sx={{ width: 300 }}
						className="car-parameters__input"
					/>
				</>
			)}
		</div>
	)
}
