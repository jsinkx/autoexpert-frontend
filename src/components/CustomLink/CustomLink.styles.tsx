import { Link, NavLink } from 'react-router-dom'

import styled from 'styled-components'

import { Colors } from '@shared/colors'

const StyledCommonAnchor = `
	color: ${Colors.BLUE};
	text-decoration: none;
	transition: all 0.3s ease;

	&:hover,
	&:active,
	&:focus {
		color: ${Colors.BLUE};
		opacity: 0.6;
	}
`

export const StyledCustomLink = styled(Link)`
	${StyledCommonAnchor}
`

export const StyledCustomNavLink = styled(NavLink)`
	${StyledCommonAnchor}
`
