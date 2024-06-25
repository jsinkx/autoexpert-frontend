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

		.title {
			margin-top: 0;
			font-size: 2em;
			text-align: center;
			user-select: none;
		}

		.contacts,
		.posts {
			width: 60%;
			margin-inline: auto;

			@media (max-width: 1370px) {
				width: 70%;
			}

			@media (max-width: 1050px) {
				width: 95%;
			}
		}

		.contacts {
			&__contact {
				min-width: 500px;
				margin-bottom: 30px;
				margin-inline: auto;

				@media (max-width: 630px) {
					min-width: 380px;
				}

				@media (max-width: 490px) {
					min-width: 290px;
				}
			}
		}

		.posts {
			margin-bottom: 30px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			&__post {
				padding: 15px;
				font-size: 1.2em;
				background-color: ${Colors.WHITE_ELEMENT_BACKGROUND_COLOR};
				border-radius: 20px;
				box-sizing: border-box;

				&__right-info {
					display: flex;
					justify-content: right;
					align-items: center;
					margin-left: auto;

					&__quote {
					}
				}

				&__paragraph {
					margin-inline: auto;
					margin-block: 20px 0;

					@media (max-width: 920px) {
						font-size: 1em;
					}
				}

				&__author {
					text-align: right;
					font-size: 1.05em;
					user-select: none;
				}
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
