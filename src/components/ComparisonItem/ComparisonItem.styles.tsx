import styled from 'styled-components'

import { Colors } from '@shared/colors'

type StyledComparisonItemProps = {
	$isPros: boolean
}

const getColor = (isPros: boolean) => {
	if (isPros) return Colors.GREEN

	return Colors.RED
}

export const StyledComparisonItem = styled.div<StyledComparisonItemProps>`
	padding: 10px;
	display: flex;
	border-radius: 4px;
	background-color: ${({ $isPros }) => getColor($isPros)};

	.comparison-item__list {
		margin: 0;
		margin-top: 5px;
		margin-left: 25px;
		padding: 0;

		&__item {
			font-size: 1.2em;
		}
	}
`
