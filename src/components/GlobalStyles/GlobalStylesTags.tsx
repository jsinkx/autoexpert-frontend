import { createGlobalStyle } from 'styled-components'

import { Colors } from '@shared/colors'

export const GlobalStyleTags = createGlobalStyle`

html {
	height: 100%;
	color: ${Colors.BLACK};
	background-color: ${Colors.WHITE};

	::selection {
		color: ${Colors.WHITE};
		background-color: ${Colors.BLUE};
	}		
	
	body {
		margin: 0;
		font-family: arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		a,
		a:hover,
		a:active,
		a:focus {
			text-decoration: none;
			outline: none;
		}

		code {
			font-family: Consolas, source-code-pro, Menlo, Monaco, 'Courier New', monospace;
		}
	}
}
`
