import { FC } from 'react'

import {
	Checkbox,
	FormControl,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectProps,
	TextField,
	TextFieldProps,
} from '@mui/material'

import { StyledInput } from './Input.styles'

type InputProps = {
	label: string
	value: string | string[]
	selectValues?: string[]
	isRequired?: boolean
	selectedValues?: string | string[]
	isSelect?: boolean
} & (TextFieldProps | SelectProps<string | string[]>)

export const Input: FC<InputProps> = ({
	className,
	label,
	value,
	selectValues = [],
	selectedValues = [],
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
				<FormControl>
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
				<TextField className="input" variant="outlined" {...(props as TextFieldProps)} />
			)}
		</StyledInput>
	)
}
