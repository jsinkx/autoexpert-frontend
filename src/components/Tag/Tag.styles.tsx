import styled from 'styled-components'

import { Colors } from '@shared/colors'

type StyledTagProps = {
	$isLoading?: boolean
}

export const StyledTag = styled.div<StyledTagProps>`
	font-size: 1.2em;
	${({ $isLoading }) =>
		!$isLoading &&
		`
			padding: 7px;
			border-radius: 2px;
			color: ${Colors.BLACK};
			background-color: ${Colors.BLUE_ELEMENT_BACKGROUND_COLOR};
	`}

	user-select: none;
	box-sizing: border-box;
`
