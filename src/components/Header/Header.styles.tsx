import styled from 'styled-components'

import { Colors } from '@shared/colors'

import { CustomLink } from '@components/CustomLink/CustomLink'

export const StyledCustomLink = styled(CustomLink)`
	color: ${Colors.WHITE};

	&:hover,
	&:active,
	&:focus {
		color: ${Colors.WHITE};
		opacity: 1;
	}
`

export const StyledHeader = styled.header`
	width: 100%;
	padding-block: 15px;
	display: flex;
	align-items: center;
	background-color: ${Colors.WHITE};
	box-shadow: 0 1px 0 rgba(0, 0, 0, 0.12);
	box-sizing: border-box;

	@media (max-width: 920px) {
		justify-content: center;
	}

	.header__nav {
		display: flex;
		justify-content: center;
		align-items: center;

		&__logo {
			display: flex;
			align-items: center;
			height: 40px;
			margin: 0;
			margin-right: 10px;
			font-size: 1.9em;
			user-select: none;

			&__image {
				width: 42px;
				margin-right: 10px;
			}

			&__text {
				color: ${Colors.BLACK} !important;
			}
		}
	}
`
