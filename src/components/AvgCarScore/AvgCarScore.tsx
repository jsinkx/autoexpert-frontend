import { ComponentPropsWithoutRef, FC } from 'react'

import StarIcon from '@mui/icons-material/Star'
import { Rating } from '@mui/material'

import { AvgCarScore as AvgCarScoreType } from '@entities/avg-car-score.types'

import { StyledAvgCarScore } from './AvgCarScore.styles'

type vgCarScoreProps = {} & AvgCarScoreType & ComponentPropsWithoutRef<'div'>

export const AvgCarScore: FC<vgCarScoreProps> = ({ name, score: _score, ...props }) => {
	const score = Number(_score.toFixed(2))

	return (
		<StyledAvgCarScore $score={score} {...props}>
			<span className="avg-car-score__name">{name}</span>
			<div className="avg-car-score__score">
				<Rating
					name={name}
					value={score}
					readOnly
					precision={0.5}
					emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
					className="avg-car-score__score__rating"
				/>
				<span className="avg-car-score__score__label">{score}</span>
			</div>
		</StyledAvgCarScore>
	)
}
