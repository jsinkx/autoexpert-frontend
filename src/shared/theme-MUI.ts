import { createTheme } from '@mui/material'
import { ruRU } from '@mui/material/locale'

import { Colors } from './colors'

export const themeMUI = createTheme(
	{
		palette: {
			primary: {
				main: Colors.BLUE,
			},

			secondary: {
				main: Colors.BLACK,
			},
		},

		typography: {
			button: {
				textTransform: 'none',
				fontSize: '0.97em',
			},
		},
	},
	ruRU,
)
