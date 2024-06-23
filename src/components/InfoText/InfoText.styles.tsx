import styled from 'styled-components'

import { Colors } from '@shared/colors'

export const StyledInfoText = styled.p`
	margin: 0;
	display: flex;
	align-items: center;
	user-select: none;

	.icon {
		margin-bottom: -4px;
		margin-right: 3px;
	}

	span {
		color: ${Colors.INACTIVE_GREY_FONT};
	}
`
