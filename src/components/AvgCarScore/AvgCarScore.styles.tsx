import styled from 'styled-components'

import { Colors } from '@shared/colors'

type StyledAvgCarScoreProps = {
	$score: number
}

const getColorByScore = (score: number) => {
	if (score >= 4.5) return Colors.GREEN
	if (score >= 4) return Colors.YELLOW

	return Colors.RED
}

export const StyledAvgCarScore = styled.div<StyledAvgCarScoreProps>`
	padding: 15px;
	border-radius: 2px;
	color: ${Colors.BLACK};
	background-color: ${({ $score }) => getColorByScore($score)};
	display: flex;
	justify-content: center;
	align-items: center;

	.avg-car-score__name {
		font-size: 1.25em;
		font-weight: bold;
	}

	.avg-car-score__score {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: auto;
		font-size: 1.5em;
		font-weight: bold;

		&__rating {
			margin-right: 10px;
		}

		&__label {
			width: 50px;
		}
	}
`
