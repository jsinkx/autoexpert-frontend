import styled from 'styled-components'

import { Colors } from '@shared/colors'

export const StyledInput = styled.div`
	display: flex;
	flex-direction: column;

	.label {
		margin: 0;
		margin-bottom: 7px;
		font-weight: 600;
		user-select: none;

		&--required-mark {
			width: 10px;
			height: 10px;
			color: ${Colors.BLUE};
			font-size: 1.3em;
		}
	}
`
