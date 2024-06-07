import { createGlobalStyle } from 'styled-components'

import Сonsolas from '@assets/fonts/Consolas/Consolas.woff2'

export const GlobalStyleFonts = createGlobalStyle`

// Consolas
@font-face {
	font-family: Consolas;
	src: url(${Сonsolas}) format("woff2");
}
`
