import styled from 'styled-components'

import { Colors } from '@shared/colors'

export const StyledContactCard = styled.div`
	padding: 20px;
	display: flex;
	align-items: center;
	background-color: ${Colors.WHITE_ELEMENT_BACKGROUND_COLOR};
	border-radius: 20px;
	box-sizing: border-box;
	user-select: none;

	.contact-card__avatar {
		width: 100px;
		height: 100px;
		margin-right: 15px;
		object-fit: cover;
		object-position: center;
		user-select: none;
		pointer-events: none;
	}

	.contact-card__info {
		&__name {
			margin: 0;
			font-weight: bold;
			font-size: 1.5em;
		}

		&__role {
			margin-block: 10px;
			font-size: 1.2em !important;
			color: ${Colors.SILVER};

			@media (max-width: 920px) {
				font-size: 1em !important;
			}
		}

		&__nav-links {
			display: flex;
			flex-direction: row;

			&__link {
				margin-right: 10px;
				display: flex;
				justify-content: center;
				align-items: center;

				&__img-logo {
					width: 25px;
					user-select: none;
				}
			}
		}
	}
`
