import { Normalize } from 'styled-normalize'

import { GlobalStyleFonts } from './GlobalStylesFont'
import { GlobalStyleTags } from './GlobalStylesTags'

export const GlobalStyles = () => {
	return (
		<>
			<Normalize />
			<GlobalStyleFonts />
			<GlobalStyleTags />
		</>
	)
}
