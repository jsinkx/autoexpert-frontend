import styled from 'styled-components'

import { Colors } from '@shared/colors'

export const StyledFooter = styled.footer`
	flex: 0 0 auto;
	background-color: ${Colors.WHITE_BACKGROUND_COLOR};
	box-sizing: border-box;

	.footer__paragraph--developer-info {
		font-family: 'Consolas', sans-serif;
		user-select: none;

		.footer__paragraph--developer-info__link {
			color: ${Colors.BLACK};
		}
	}
`
