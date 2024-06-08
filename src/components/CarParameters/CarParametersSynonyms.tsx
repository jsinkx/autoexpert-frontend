import { FC, useState } from 'react'

import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material'

type CarParametersSynonymsProps = {}

const MOCK_SYNONYMS = [
	'автомобиль',
	'машина',
	'тачка',
	'аппарат',
	'баранка',
	'автобус',
	'трамвай',
	'троллейбус',
	'троллейбус',
]

export const CarParametersSynonyms: FC<CarParametersSynonymsProps> = () => {
	const [selectedSynonyms, setSelectedSynonyms] = useState<string[]>(MOCK_SYNONYMS)
	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(event.type === 'focus')
	}

	const handleChangeSynonyms = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event

		setSelectedSynonyms(typeof value === 'string' ? value.split(',') : value)
	}

	return (
		<div className="car-parameters">
			<p className="car-parameters__label"> Выбор синонимов </p>
			<FormControl sx={{ width: '300px' }} size="small">
				{selectedSynonyms.length === 0 && !isFocused && (
					<InputLabel>{MOCK_SYNONYMS.length} синонима(-ов)</InputLabel>
				)}
				<Select
					multiple
					value={selectedSynonyms}
					onChange={handleChangeSynonyms}
					onFocus={handleFocus}
					onBlur={handleFocus}
					renderValue={(selected) => selected.join(', ')}
					className="car-parameters__select"
				>
					{MOCK_SYNONYMS.map((siteSource) => (
						<MenuItem key={siteSource} value={siteSource}>
							<ListItemIcon>
								<Checkbox checked={selectedSynonyms.indexOf(siteSource) > -1} />
							</ListItemIcon>
							<ListItemText primary={siteSource} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
