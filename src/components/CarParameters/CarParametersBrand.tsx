import { FC, SyntheticEvent, useState } from 'react'

import { Autocomplete, TextField } from '@mui/material'

type CarParametersBrandProps = {}

const MOCK_CAR_BRANDS = [
	'Audi',
	'BMW',
	'Mercedes',
	'Volkswagen',
	'Toyota',
	'Nissan',
	'Hyundai',
	'Kia',
	'Ford',
	'Chevrolet',
	'Porsche',
	'Jaguar',
]
const MOCK_CAR_MODELS = [
	'A6',
	'A8',
	'C3',
	'C4',
	'C5',
	'C6',
	'C7',
	'C8',
	'S3',
	'S4',
	'S5',
	'S6',
	'S7',
	'S8',
	'X3',
	'X4',
	'X5',
	'X6',
	'X7',
	'X8',
]
const MOC_CAR_BODY = ['LIFTBACK', 'HATCHBACK', 'SEDAN']

export const CarParametersBrand: FC<CarParametersBrandProps> = () => {
	const [carBrand, setCarBrand] = useState('')
	const [carModel, setCarModel] = useState('')
	const [carBody, setCarBody] = useState('')

	const handleChangeCarBrand = (_: SyntheticEvent<Element, Event>, value: string | null) => {
		value && setCarBrand(value)
	}

	const handleChangeCarModel = (_: SyntheticEvent<Element, Event>, value: string | null) => {
		value && setCarModel(value)
	}

	const handleChangeCarBody = (_: SyntheticEvent<Element, Event>, value: string | null) => {
		value && setCarBody(value)
	}

	return (
		<div className="car-parameters">
			<p className="car-parameters__label"> Марка </p>
			<Autocomplete
				options={MOCK_CAR_BRANDS}
				value={carBrand}
				onChange={handleChangeCarBrand}
				isOptionEqualToValue={(option, value) => option === value}
				renderInput={(params) => {
					// @ts-ignore
					return <TextField {...params} size="small" placeholder="Марка" />
				}}
				sx={{ width: 300 }}
				className="car-parameters__input"
			/>
			{!!carBrand && (
				<>
					<p className="car-parameters__label"> Модель </p>
					<Autocomplete
						options={MOCK_CAR_MODELS}
						value={carModel}
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
			{!!carBrand && !!carModel && (
				<>
					<p className="car-parameters__label"> Корпус </p>
					<Autocomplete
						options={MOC_CAR_BODY}
						value={carBody}
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
