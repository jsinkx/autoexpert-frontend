import styled from 'styled-components'

import { Colors } from '@shared/colors'

export const StyledAboutUsPage = styled.div`
	.page__title {
		margin-top: 0;
		font-size: 2em;
		user-select: none;

		@media (max-width: 920px) {
			text-align: center;
		}
	}

	.page__content {
		display: flex;
		flex-direction: column;

		img {
			width: 250px;
			margin-bottom: 10px;
			display: flex;
			user-select: none;

			@media (max-width: 920px) {
				margin-inline: auto;
			}
		}

		p {
			max-width: 900px;
			margin-block: 10px;
			font-size: 1.3em;

			@media (max-width: 920px) {
				font-size: 1em;
			}
		}
	}

	.span--color-blue {
		color: ${Colors.BLUE};
	}
`
