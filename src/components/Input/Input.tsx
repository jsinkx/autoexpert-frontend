import { FC } from 'react'

import {
	Checkbox,
	FormControl,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectProps,
	SxProps,
	TextField,
	TextFieldProps,
	Theme,
} from '@mui/material'

import { StyledInput } from './Input.styles'

type InputProps = {
	label: string
	value: string | string[]
	selectValues?: string[]
	selectedValues?: string | string[]
	size?: 'small' | 'medium'
	sx?: SxProps<Theme>
	isRequired?: boolean
	isSelect?: boolean
} & (TextFieldProps | SelectProps<string | string[]>)

export const Input: FC<InputProps> = ({
	className,
	label,
	value,
	selectValues = [],
	selectedValues = [],
	size = 'small',
	sx = {},
	isRequired = false,
	isSelect = false,
	...props
}) => {
	return (
		<StyledInput className={className}>
			<p className="label">
				{label}
				{isRequired && <span className="label--required-mark">*</span>}
			</p>
			{isSelect ? (
				<FormControl size={size} sx={sx}>
					<Select
						value={value || ''}
						renderValue={(selected) => (typeof selected === 'object' ? selected.join(', ') : selected)}
						{...(props as SelectProps<string | string[]>)}
					>
						{selectValues.map((selectValue) => (
							<MenuItem key={selectValue} value={selectValue}>
								<ListItemIcon>
									<Checkbox checked={selectedValues.indexOf(selectValue) > -1} />
								</ListItemIcon>
								<ListItemText primary={selectValue} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
			) : (
				<TextField className="input" variant="outlined" size={size} sx={sx} {...(props as TextFieldProps)} />
			)}
		</StyledInput>
	)
}
