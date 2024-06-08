import { themeMUI } from '@shared/theme-MUI'

import { GlobalStyles } from '@components/GlobalStyles/GlobalStyles'
import { Routes } from '@components/Routes/Routes'

import { ThemeProvider } from '@mui/material'

export const App = () => {
	return (
		<div className="app">
			<ThemeProvider theme={themeMUI}>
				<GlobalStyles />
				<Routes />
			</ThemeProvider>
		</div>
	)
}
