import styled from 'styled-components'

import { Colors } from '@shared/colors'

export const StyledAboutUsPage = styled.div`
	.page__title {
		margin-top: 0;
		font-size: 2em;
		text-align: center;
		user-select: none;

		@media (max-width: 920px) {
			text-align: center;
		}
	}

	.page__content {
		display: flex;
		flex-direction: column;
		justify-content: center;

		.content__row {
			display: flex;
			justify-content: center;

			@media (max-width: 640px) {
				flex-direction: column;
			}

			&__image {
				width: 250px;
				margin-inline: 10px;
				margin-bottom: 10px;
				display: flex;
				object-fit: cover;
				user-select: none;
				pointer-events: none;

				@media (max-width: 920px) {
					margin-inline: auto;
				}
			}
		}

		p {
			max-width: 900px;
			margin-inline: auto;
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

	.span--underline {
		text-decoration: underline;
	}
`
