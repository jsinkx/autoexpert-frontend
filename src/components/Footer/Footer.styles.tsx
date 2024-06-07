import styled from 'styled-components'

import { Colors } from '@shared/colors'

export const StyledFooter = styled.footer`
	background-color: ${Colors.WHITE_BACKGROUND_COLOR};

	.footer__paragraph--developer-info {
		font-family: 'Consolas', sans-serif;
		user-select: none;

		.footer__paragraph--developer-info__link {
			color: ${Colors.BLACK};
		}
	}
`
