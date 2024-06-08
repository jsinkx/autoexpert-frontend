import { FC } from 'react'

import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'

type ReviewRateIconProps = {
	score: string
}

export const ReviewRateIcon: FC<ReviewRateIconProps> = ({ score }) => {
	switch (score) {
		case 'Позитивный':
			return <SentimentSatisfiedAltIcon fontSize="large" />
		case 'Негативный':
			return <SentimentVeryDissatisfiedIcon fontSize="large" />
		case 'Нейтральный':
			return <SentimentNeutralIcon fontSize="large" />
		default:
			return <SentimentNeutralIcon fontSize="large" />
	}
}
