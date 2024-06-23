import styled from 'styled-components'

import { Colors } from '@shared/colors'

type StyledComparisonItemProps = {
	$isPros: boolean
}

const getColor = (isPros: boolean) => {
	if (isPros)
		return {
			fontColor: Colors.GREEN_MUI,
			backgroundColor: Colors.GREEN,
		}

	return {
		fontColor: Colors.RED_MUI,
		backgroundColor: Colors.RED,
	}
}

export const StyledComparisonItem = styled.div<StyledComparisonItemProps>`
	display: flex;
	flex-direction: column;
	border-radius: 4px;
	/* background-color: ${({ $isPros }) => getColor($isPros)}; */

	h3 {
		margin-top: 0;
		text-align: center;
	}

	.comparison-item__list {
		margin: 0;
		margin-top: 5px;
		padding: 0;
		text-decoration: none;

		&__item {
			margin-bottom: 10px;
			padding: 10px;
			display: flex;
			align-items: center;
			font-size: 1.2em;
			background-color: ${({ $isPros }) => getColor($isPros).backgroundColor};

			&--percentage {
				margin-left: 5px;
				color: ${({ $isPros }) => getColor($isPros).fontColor};
			}

			&--count {
				margin-left: auto;
			}
		}
	}

	.item-icon {
		margin-right: 10px;
	}

	.open-more {
		margin-inline: auto;
		display: flex;
		justify-content: center;
	}
`
