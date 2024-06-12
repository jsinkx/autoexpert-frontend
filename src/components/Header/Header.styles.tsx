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
	display: flex;
	align-items: center;
	background-color: ${Colors.BLACK};
	padding-block: 5px;

	.header__nav {
		display: flex;
		justify-content: center;
		align-items: center;

		&__logo--text {
			display: flex;
			align-items: center;
			height: 40px;
			margin: 0;
			margin-right: 10px;
			font-size: 1.9em;
			user-select: none;

			&__logo {
				width: 40px;
				margin-right: 10px;
			}
		}
	}
`
