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

type CarParametersSiteSourcesProps = {}

const MOCK_SITE_SOURCES = ['auto.ru', 'drom', 'avito']

export const CarParametersSiteSources: FC<CarParametersSiteSourcesProps> = () => {
	const [selectedSiteSources, setSelectedSiteSources] = useState<string[]>(MOCK_SITE_SOURCES)
	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(event.type === 'focus')
	}

	const handleChangeSiteSources = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event

		setSelectedSiteSources(typeof value === 'string' ? value.split(',') : value)
	}

	return (
		<div className="car-parameters">
			<p className="car-parameters__label"> Выбор источников </p>
			<FormControl sx={{ width: '300px' }} size="small">
				{selectedSiteSources.length === 0 && !isFocused && (
					<InputLabel>{MOCK_SITE_SOURCES.length} источника(-ов)</InputLabel>
				)}
				<Select
					multiple
					value={selectedSiteSources}
					onChange={handleChangeSiteSources}
					onFocus={handleFocus}
					onBlur={handleFocus}
					renderValue={(selected) => selected.join(', ')}
					className="car-parameters__select"
				>
					{MOCK_SITE_SOURCES.map((siteSource) => (
						<MenuItem key={siteSource} value={siteSource}>
							<ListItemIcon>
								<Checkbox checked={selectedSiteSources.indexOf(siteSource) > -1} />
							</ListItemIcon>
							<ListItemText primary={siteSource} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
