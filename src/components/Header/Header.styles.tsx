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

	.header__logo--text {
		display: inline;
		height: 40px;
		margin: 0;
		font-size: 1.9em;
		user-select: none;
	}
`
